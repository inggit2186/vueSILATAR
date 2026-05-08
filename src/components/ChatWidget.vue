<template>
  <div class="chat-widget">
    <div v-if="!isOpen" class="chat-icon" title="Open chat" @click.stop="toggleChat">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="chat-icon-svg">
        <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"></path>
      </svg>
      <span class="chat-text">Chat</span>
      <div v-if="hasNewMessage" class="new-message-notification">Ada Pesan Baru !!</div>
    </div>
    <div v-else ref="chatWindow" class="chat-window" @click.stop>
      <div class="chat-header">
        <span>Live Chat</span>
        <button v-if="isAuthenticated && currentUser && currentUser.role === 'admin'" class="clear-btn" aria-label="Clear all chat messages" @click="clearAllMessages">Clear All</button>
        <button class="close-btn" aria-label="Close chat" @click="toggleChat">&times;</button>
      </div>
      <div ref="messagesContainer" class="chat-messages" tabindex="0" aria-live="polite" aria-atomic="false">
        <div v-if="isLoading" class="loading-container">
          <div class="loading-spinner"></div>
          <span class="loading-text">Loading messages...</span>
        </div>
        <div v-for="message in messages" :key="message.id" class="message" :class="{ 'own': message.sender === (isAuthenticated ? currentUser.name : guestName) }">
          <div class="message-content">
            <img v-if="message.pp" :src="message.pp" :alt="message.sender" class="message-avatar" />
            <div class="message-body">
              <div class="message-header">
                <div class="sender-info">
                  <strong>{{ message.sender }}</strong>
                  <span v-if="message.role" :class="getRoleClass(message.role)" class="message-role">{{ getDisplayRole(message.role) }}</span>
                </div>
                <span class="message-time">{{ formatTime(message.time) }}</span>
              </div>
      <div v-if="message.type === 'audio'" class="message-audio">
        <audio controls :src="getAudioSrc(message.text)" crossorigin="anonymous"></audio>
      </div>
              <div v-else class="message-text">{{ message.text }}</div>
            </div>
          </div>
        </div>
      </div>

      <div class="chat-input">
        <div class="input-container" :class="{ 'recording': isRecording }">
          <textarea
            ref="messageTextarea"
            v-model="newMessage"
            placeholder="Type a message..."
            :disabled="!(isAuthenticated || guestName) || isSending"
            aria-label="Type your message"
            style="overflow:hidden;resize:none"
            @keydown.enter="handleEnter"
            @input="onInput"
          ></textarea>
          <div v-if="isRecording" class="recording-status">
            <div class="recording-dot"></div>
            <span>Recording...</span>
          </div>
          <button v-if="!isRecording" class="mic-icon" :disabled="!(isAuthenticated || guestName) || isSending" aria-label="Record voice message" @click="toggleRecording">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mic-icon-svg">
              <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
              <path d="M19 10v1a7 7 0 0 1-14 0v-1"></path>
              <line x1="12" y1="19" x2="12" y2="23"></line>
              <line x1="8" y1="23" x2="16" y2="23"></line>
            </svg>
          </button>
          <button v-else class="stop-icon" :disabled="!(isAuthenticated || guestName) || isSending" aria-label="Stop recording" @click="stopRecording">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="stop-icon-svg">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
            </svg>
          </button>
          <button class="emoji-icon" :disabled="!(isAuthenticated || guestName) || isSending" aria-label="Open emoji picker" @click="toggleEmojiPicker">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="emoji-icon-svg">
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
              <line x1="9" y1="9" x2="9.01" y2="9"></line>
              <line x1="15" y1="9" x2="15.01" y2="9"></line>
            </svg>
          </button>
          <button class="send-icon" :class="{ 'typing': newMessage.trim() || audioUrl }" :disabled="!(isAuthenticated || guestName) || isSending" aria-label="Send message" @click="sendMessage">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="send-icon-svg">
              <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"></path>
            </svg>
          </button>
          <div v-if="showEmojiPicker" class="emoji-picker">
            <div class="emoji-grid">
              <span v-for="emoji in pagedEmojis" :key="emoji" class="emoji-item" @click="insertEmoji(emoji)">{{ emoji }}</span>
            </div>
            <div class="emoji-pagination">
              <button :disabled="emojiPage === 1" aria-label="Previous emoji page" @click="prevEmojiPage">Prev</button>
              <span>Page {{ emojiPage }} / {{ totalEmojiPages }}</span>
              <button :disabled="emojiPage === totalEmojiPages" aria-label="Next emoji page" @click="nextEmojiPage">Next</button>
            </div>
          </div>
        </div>
        <div v-if="isTyping" class="typing-indicator">Typing...</div>
      </div>
    </div>
    <!-- Guest Name Modal -->
    <div v-if="!isAuthenticated && !guestName && isOpen" class="guest-name-modal" @click.stop>
      <div class="modal-content">
        <h3>Selamat Datang Live Chat</h3>
        <p>Mohon Masukkan Nama Anda untuk memulai chatting:</p>
        <input
          ref="nameInputRef"
          v-model="nameInput"
          placeholder="Masukkan Nama"
          class="modal-name-input"
          @keydown.enter="setGuestName"
        />
        <button class="modal-start-btn" :disabled="!nameInput.trim()" @click="setGuestName">Start Chatting</button>
      </div>
    </div>
    <!-- Notification Modal -->
    <div v-if="showNotificationModal" class="notification-modal" @click.stop>
      <div class="modal-content">
        <h3>Aktifkan Notifikasi</h3>
        <p>Untuk Menerima Notifikasi, Harap Aktifkan Notifikasi di Pengaturan Browser Anda.</p>
        <button class="modal-enable-btn" @click="requestNotificationPermission">Aktifkan Notifikasi</button><br/>
        <button class="modal-close-btn" @click="showNotificationModal = false">Close</button>
      </div>
    </div>
  </div>
</template>

<script>
import { io } from 'socket.io-client';
import emitter from '../eventBus';
import chatService from '../services/chatService';

export default {
  name: 'ChatWidget',
  props: {
    isAuthenticated: {
      type: Boolean,
      default: false
    },
    currentUser: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      isOpen: false,
      messages: [],
      newMessage: '',
      guestName: '',
      nameInput: '',
      socket: null,
      isLoading: false,
      isSending: false,
      showEmojiPicker: false,
      isTyping: false,
      typingTimeout: null,
      emojiPage: 1,
      emojisPerPage: 50,
      hasNewMessage: false,
      previousMessageCount: 0,
      isRecording: false,
      mediaRecorder: null,
      audioChunks: [],
      audioUrl: null,
      audioBase64: null,
      recordingTimeout: null,
      connectedUsers: [],
      typingUsers: [],
      showNotificationModal: false,
      emojis: [
        // Faces and Emotions
        '😀', '😂', '😊', '😍', '🥰', '😘', '😉', '😎', '🤔', '😢', '😭', '😤', '😡', '🥺', '😴', '🤤', '😵', '🤯', '🤠', '🥳',
        '😇', '👿', '👻', '💀', '🤖', '👽', '👾', '🎃', '😺', '😸', '😹', '😻', '😼', '😽', '🙀', '😿', '😾',
        // Hands and Gestures
        '🤲', '👐', '🙌', '👏', '🤝', '👍', '👎', '👌', '✌️', '🤞', '🤟', '🤘', '🤙', '👈', '👉', '👆', '🖕', '👇', '☝️', '👋', '🤚', '🖐️', '✋', '🖖',
        // Animals
        '🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯', '🦁', '🐮', '🐷', '🐽', '🐸', '🐵', '🙈', '🙉', '🙊', '🐒', '🐔', '🐧', '🐦', '🐤', '🐣', '🐥', '🦆', '🦅', '🦉', '🦇', '🐺', '🐗', '🐴', '🦄', '🐝', '🐛', '🦋', '🐌', '🐞', '🐜', '🦗', '🕷️', '🦂', '🐢', '🐍', '🦎', '🦖', '🦕', '🐙', '🦑', '🦐', '🦞', '🦀', '🐡', '🐠', '🐟', '🐬', '🐳', '🐋', '🦈', '🐊', '🐅', '🐆', '🦓', '🦍', '🦧', '🐘', '🦛', '🦏', '🐪', '🐫', '🦒', '🦘', '🐃', '🐂', '🐄', '🐎', '🐖', '🐏', '🐑',
        // Food and Drink
        '🍎', '🍊', '🍋', '🍌', '🍉', '🍇', '🍓', '🫐', '🍈', '🍒', '🍑', '🥭', '🍍', '🥥', '🥝', '🍅', '🍆', '🥑', '🥦', '🥬', '🥒', '🌶️', '🫑', '🌽', '🥕', '🫒', '🧄', '🧅', '🥔', '🍠', '🥐', '🥖', '🍞', '🥨', '🥯', '🧀', '🥚', '🍳', '🧈', '🥞', '🧇', '🥓', '🥩', '🍗', '🍖', '🦴', '🌭', '🍔', '🍟', '🍕', '🫓', '🥙', '🌮', '🌯', '🫔', '🥗', '🥘', '🫕', '🍝', '🍜', '🍲', '🍛', '🍣', '🍱', '🥟', '🦪', '🍤', '🍙', '🍚', '🍘', '🍥', '🥠', '🥮', '🍢', '🍡', '🍧', '🍨', '🍦', '🥧', '🧁', '🍰', '🎂', '🍮', '🍭', '🍬', '🍫', '🍿', '🍩', '🍪', '🌰', '🥜', '🍯', '🥛', '🍼', '☕', '🫖', '🍵', '🧃', '🥤', '🧋', '🍶', '🍺', '🍻', '🥂', '🍷', '🥃', '🍸', '🍹', '🧉', '🍾',
        // Activities and Sports
        '⚽', '🏀', '🏈', '⚾', '🥎', '🎾', '🏐', '🏉', '🥏', '🎱', '🪀', '🏓', '🏸', '🏒', '🏑', '🥍', '🏏', '🪃', '🥅', '⛳', '🪁', '🏹', '🎣', '🤿', '🥊', '🥋', '🎽', '🛹', '🛷', '⛸️', '🥌', '🎿', '⛷️', '🏂', '🪂', '🏋️', '🤸', '⛹️', '🤺', '🤾', '🏌️', '🧘', '🏃', '🚶', '🧎', '🧍', '🤳', '💃', '🕺', '👯', '🪩', '🎤', '🎧', '🎼', '🎹', '🥁', '🪘', '🎷', '🎺', '🪗', '🎸', '🪕', '🎻', '🎲', '♠️', '♥️', '♦️', '♣️', '🃏', '🀄', '🎴',
        // Travel and Places
        '🚗', '🚕', '🚙', '🚌', '🚎', '🏎️', '🚓', '🚑', '🚒', '🚐', '🚚', '🚛', '🚜', '🏍️', '🛵', '🚲', '🛴', '🛹', '🚁', '🚟', '🚠', '🚡', '🛤️', '🛣️', '🗺️', '⛽', '🚨', '🚥', '🚦', '🛑', '🚧', '⚓', '⛵', '🛶', '🚤', '🛳️', '⛴️', '🛥️', '🚢', '✈️', '🛩️', '🛫', '🛬', '🪂', '💺', '🚀', '🛸', '🚁', '🚟', '🚠', '🚡', '🛤️', '🛣️', '🗺️', '⛽', '🚨', '🚥', '🚦', '🛑', '🚧', '⚓', '⛵', '🛶', '🚤', '🛳️', '⛴️', '🛥️', '🚢', '✈️', '🛩️', '🛫', '🛬', '🪂', '💺', '🚀', '🛸',
        // Objects
        // Flags
        '🏁', '🚩', '🎌', '🏴', '🏳️', '🏳️‍🌈', '🏳️‍⚧️', '🏴‍☠️', '🇺🇸', '🇬🇧', '🇨🇦', '🇦🇺', '🇩🇪', '🇫🇷', '🇯🇵', '🇰🇷', '🇨🇳', '🇮🇳', '🇧🇷', '🇲🇽', '🇷🇺', '🇮🇹', '🇪🇸', '🇳🇱', '🇸🇪', '🇳🇴', '🇩🇰', '🇫🇮', '🇵🇱', '🇹🇷', '🇬🇷', '🇵🇹', '🇭🇺', '🇨🇿', '🇸🇰', '🇦🇹', '🇨🇭', '🇧🇪', '🇱🇺', '🇮🇪', '🇮🇸', '🇬🇱', '🇫🇴', '🇩🇰', '🇸🇪', '🇳🇴', '🇫🇮', '🇪🇪', '🇱🇻', '🇱🇹', '🇲🇹', '🇨🇾', '🇸🇮', '🇭🇷', '🇧🇦', '🇲🇪', '🇦🇱', '🇲🇰', '🇷🇸', '🇽🇰', '🇲🇪', '🇧🇬', '🇷🇴', '🇲🇩', '🇺🇦', '🇧🇾', '🇷🇺', '🇰🇿', '🇰🇬', '🇹🇯', '🇹🇲', '🇺🇿', '🇦🇿', '🇦🇲', '🇬🇪', '🇦🇿', '🇦🇲', '🇬🇪', '🇦🇿', '🇦🇲', '🇬🇪'
      ]
    }
  },
  computed: {
    totalEmojiPages() {
      return Math.ceil(this.emojis.length / this.emojisPerPage);
    },
    pagedEmojis() {
      const start = (this.emojiPage - 1) * this.emojisPerPage;
      return this.emojis.slice(start, start + this.emojisPerPage);
    }
  },
  mounted() {

    this.checkAuth();
    this.initSocket();

    this.onLoginSuccess = () => this.checkAuth();
    this.onLogout = () => this.checkAuth();
    emitter.on('login-success', this.onLoginSuccess);
    emitter.on('logout', this.onLogout);
  },
  beforeUnmount() {
    if (this.socket) {
      this.socket.disconnect();
    }
    emitter.off('login-success', this.onLoginSuccess);
    emitter.off('logout', this.onLogout);
  },
  methods: {
    checkAuth() {
      const token = localStorage.getItem('token');
      const user = localStorage.getItem('user');
      if (token && user) {
        // Authentication handled via props
      } else {
        // Authentication handled via props
      }
    },
    initSocket() {
      this.socket = io(import.meta.env.VITE_SOCKET_URL || 'https://node.kemenagtd.top');
      
      // Initialize chatService with this socket (no more Firebase)
      chatService.setSocket(this.socket);

      this.socket.on('load_messages', (messages) => {
        this.messages = messages;
        this.isLoading = false;
        this.$nextTick(() => {
          this.scrollToBottom();
        });
      });

      this.socket.on('new_message', (message) => {
        this.messages.push(message);
        if (!this.isOpen) {
          this.hasNewMessage = true;
        }
        // Show desktop notification for new message
        this.showNewMessageNotification(message);
        this.$nextTick(() => {
          this.scrollToBottom();
        });
      });

      this.socket.on('user_joined', (userData) => {
        console.log('User joined:', userData);
        this.showJoinNotification('User Joined', `${userData.name} has joined the chat.`);
      });

      this.socket.on('user_left', (userData) => {
        console.log('User left:', userData);
      });

      this.socket.on('user_typing', (userData) => {
        if (!this.typingUsers.includes(userData.name)) {
          this.typingUsers.push(userData.name);
        }
      });

      this.socket.on('user_stop_typing', (userData) => {
        const index = this.typingUsers.indexOf(userData.name);
        if (index > -1) {
          this.typingUsers.splice(index, 1);
        }
      });

      this.socket.on('clear_messages', () => {
        this.messages = [];
      });
    },
    async toggleChat() {
      if (!this.isOpen) {
        this.isOpen = true;
        this.hasNewMessage = false;
        this.isLoading = true;

        // Check notification permission
        if (Notification.permission === 'default') {
          this.showNotificationModal = true;
        }

        // Show welcome notification
        this.showJoinNotification('Selamat Datang di Live Chat!', 'Anda Telah Bergabung ke Room.');

        // Join chat room
        const userData = this.isAuthenticated
          ? { name: this.currentUser.name, role: this.currentUser.role, pp: import.meta.env.VITE_APP_ST_URL+'/'+this.currentUser.noid+'/'+this.currentUser.pp || '../assets/img/profile-img.jpg' }
          : { name: this.guestName, role: 'guest', pp: 'assets/img/defaultpp.png' };
        this.socket.emit('join_chat', userData);

        this.$nextTick(() => {
          this.scrollToBottom();
          if (this.$refs.nameInputRef) {
            this.$refs.nameInputRef.focus();
          } else {
            this.$refs.messagesContainer.focus();
          }
        });
        document.addEventListener('click', this.handleClickOutside);
      } else {
        this.isOpen = false;
        document.removeEventListener('click', this.handleClickOutside);
      }
    },
    async sendMessage() {
      if ((!this.newMessage.trim() && !this.audioUrl) || this.isSending) return;

      let user, pp, role;

      if (!this.isAuthenticated) {
        user = this.guestName;
        pp = 'assets/img/defaultpp.png';
        role = 'guest';
      } else {
        user = this.currentUser.name;
        pp = import.meta.env.VITE_APP_ST_URL+'/'+this.currentUser.noid+'/'+this.currentUser.pp || '../assets/img/profile-img.jpg';
        role = this.currentUser.role;
      }

      this.isSending = true;
      try {
        const messageData = {
          sender: user,
          text: this.audioUrl ? this.audioBase64 : this.newMessage,
          type: this.audioUrl ? 'audio' : 'text',
          pp: pp,
          role: role
        };

        this.socket.emit('send_message', messageData);

        this.newMessage = '';
        this.audioUrl = null;
        this.audioBase64 = null;
        this.$nextTick(() => {
          this.scrollToBottom();
        });
      } catch (error) {
        console.error('Error sending message:', error);
      } finally {
        this.isSending = false;
      }
    },

    handleEnter(event) {
      if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        this.sendMessage();
      }
    },
    scrollToBottom() {
      const container = this.$refs.messagesContainer;
      if (container) {
        container.scrollTop = container.scrollHeight;
      }
    },
    formatTime(createdAt) {
      if (!createdAt) return '';
      const date = new Date(createdAt);
      const now = new Date();
      const diff = now - date;
      const minutes = Math.floor(diff / 60000);
      const hours = Math.floor(diff / 3600000);
      const days = Math.floor(diff / 86400000);

      if (days > 0) {
        const day = date.getDate();
        const month = date.toLocaleString('en-US', { month: 'long' });
        const year = date.getFullYear();
        return `${day} ${month} ${year}`;
      } else if (hours > 0) {
        return `${hours}h ago`;
      } else if (minutes > 0) {
        return `${minutes}m ago`;
      } else {
        return 'now';
      }
    },
    getRoleClass(role) {
      if (!role) return '';
      const roleClasses = {
        admin: 'role-admin',
        kepala: 'role-kepala',
        kasi: 'role-kasi',
        kasubbag: 'role-kasubbag',
        petugas: 'role-petugas',
        pegawai: 'role-pegawai',
        frontdesk: 'role-ptsp'
      };
      return roleClasses[role.toLowerCase()] || '';
    },
    getDisplayRole(role) {
      if (!role) return '';
      const displayRoles = {
        admin: 'admin',
        kepala: 'kepala',
        kasi: 'kasi',
        kasubbag: 'kasubbag',
        petugas: 'staff',
        pegawai: 'asn',
        frontdesk: 'frontdesk',
        other: 'guest'
      };
      return displayRoles[role.toLowerCase()] || role;
    },
    toggleEmojiPicker() {
      this.showEmojiPicker = !this.showEmojiPicker;
    },
    insertEmoji(emoji) {
      const textarea = this.$refs.messageTextarea;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      this.newMessage = this.newMessage.substring(0, start) + emoji + this.newMessage.substring(end);
      this.showEmojiPicker = false;
      this.$nextTick(() => {
        textarea.focus();
        textarea.setSelectionRange(start + emoji.length, start + emoji.length);
      });
    },
    onInput() {
      // Typing indicator logic
      this.isTyping = true;
      if (this.typingTimeout) {
        clearTimeout(this.typingTimeout);
      }
      this.typingTimeout = setTimeout(() => {
        this.isTyping = false;
      }, 1500);

      // Auto-resize textarea
      const textarea = this.$refs.messageTextarea;
      if (textarea) {
        textarea.style.height = 'auto';
        textarea.style.height = textarea.scrollHeight + 'px';
      }
    },
    prevEmojiPage() {
      if (this.emojiPage > 1) {
        this.emojiPage--;
      }
    },
    nextEmojiPage() {
      if (this.emojiPage < this.totalEmojiPages) {
        this.emojiPage++;
      }
    },
    handleClickOutside(event) {
      if (this.isOpen && this.$refs.chatWindow && !this.$refs.chatWindow.contains(event.target)) {
        this.isOpen = false;
        document.removeEventListener('click', this.handleClickOutside);
      }
    },
    setGuestName() {
      if (this.nameInput.trim()) {
        this.guestName = this.nameInput.trim();
        this.nameInput = '';
        this.$nextTick(() => {
          this.$refs.messageTextarea.focus();
        });
      }
    },
    async toggleRecording() {
      if (this.isRecording) {
        await this.stopRecording();
      } else {
        await this.recordVoice();
      }
    },
async recordVoice() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        this.mediaRecorder = new MediaRecorder(stream);
        this.audioChunks = [];
        this.mediaRecorder.ondataavailable = (event) => {
          this.audioChunks.push(event.data);
        };
        this.mediaRecorder.onstop = () => {
          const audioBlob = new Blob(this.audioChunks, { type: 'audio/webm' });
          const reader = new FileReader();
          reader.onload = () => {
            this.audioBase64 = reader.result.split(',')[1]; // remove data:audio/webm;base64,
            this.audioUrl = URL.createObjectURL(audioBlob);
          };
          reader.readAsDataURL(audioBlob);
          stream.getTracks().forEach(track => track.stop());
        };
        this.mediaRecorder.start();
        this.isRecording = true;
        this.recordingTimeout = setTimeout(() => {
          this.stopRecording();
        }, 60000);
      } catch (error) {
        console.error('Error accessing microphone:', error);
        alert('Error accessing microphone: ' + error.message);
      }
    },
    async stopRecording() {
      if (this.mediaRecorder && this.isRecording) {
        this.mediaRecorder.stop();
        this.isRecording = false;
      }
    },
    getAudioSrc(base64) {
      const binaryString = atob(base64);
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      const blob = new Blob([bytes], { type: 'audio/webm' });
      return URL.createObjectURL(blob);
    },
    playAudio(message) {
      // Optional: track play events if needed
    },
    async clearAllMessages() {
      if (confirm('Are you sure you want to clear all chat messages?')) {
        try {
          // Clear messages from Firestore database
          // Emit socket event to clear messages from all connected clients
          this.socket.emit('clear_messages');
        } catch (error) {
          console.error('Error clearing messages:', error);
          alert('Failed to clear messages. Please try again.');
        }
      }
    },
    showNewMessageNotification(message, isSent = false) {
      // Request notification permission if not already granted
      if (Notification.permission === 'default') {
        Notification.requestPermission().then((permission) => {
          if (permission === 'granted') {
            this.createNotification(message, isSent);
          }
        });
      } else if (Notification.permission === 'granted') {
        this.createNotification(message, isSent);
      }
    },
    showJoinNotification(title, body) {
      // Request notification permission if not already granted
      if (Notification.permission === 'default') {
        Notification.requestPermission().then((permission) => {
          if (permission === 'granted') {
            this.createJoinNotification(title, body);
          }
        });
      } else if (Notification.permission === 'granted') {
        this.createJoinNotification(title, body);
      }
    },
    createJoinNotification(title, body) {
      const options = {
        body: body,
        icon: '/favicon.png',
        badge: '/favicon.png',
        tag: 'chat-join', // Prevents duplicate notifications
        requireInteraction: false,
        silent: false
      };

      const notification = new Notification(title, options);

      // Auto-close notification after 5 seconds
      setTimeout(() => {
        notification.close();
      }, 5000);

      // Handle notification click
      notification.onclick = () => {
        window.location.href = window.location.origin;
        notification.close();
      };
    },
    createNotification(message, isSent = false) {
      const senderRole = message.role ? ` (${message.role})` : '';
      const messageText = message.type === 'audio' ? '🎵 Voice message' : message.text;

      let title, body;

      if (isSent) {
        title = 'Message sent';
        body = messageText;
      } else {
        title = `${message.sender}${senderRole}`;
        body = messageText;
      }

      // Truncate body if too long (notifications have limits)
      if (body && body.length > 100) {
        body = body.substring(0, 97) + '...';
      }

      const options = {
        body: body,
        icon: message.pp || '/favicon.png',
        badge: '/favicon.png',
        tag: isSent ? 'chat-sent' : 'chat-message', // Prevents duplicate notifications
        requireInteraction: false,
        silent: false
      };

      const notification = new Notification(title, options);

      // Auto-close notification after 5 seconds
      setTimeout(() => {
        notification.close();
      }, 5000);

      // Handle notification click
      notification.onclick = () => {
        window.location.href = window.location.origin;
        notification.close();
      };
    },
    requestNotificationPermission() {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          this.showNotificationModal = false;
        }
      });
    },

  }
}
</script>

<style scoped>
.chat-widget {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 1000;
  font-family: 'Plus Jakarta Sans', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  user-select: none;
}

.chat-icon {
  width: 120px;
  height: 56px;
  background: linear-gradient(135deg, #2563eb, #06b6d4);
  border-radius: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  cursor: pointer;
  box-shadow: 0 16px 30px rgba(37, 99, 235, 0.24);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.chat-icon:hover {
  transform: translateY(-2px);
  box-shadow: 0 18px 34px rgba(37, 99, 235, 0.28);
}

.chat-icon-svg {
  width: 28px;
  height: 28px;
  stroke: white;
  filter: drop-shadow(0 0 2px rgba(255, 255, 255, 0.25));
  transition: filter 0.3s ease;
}
.chat-icon:hover .chat-icon-svg {
  filter: drop-shadow(0 0 4px rgba(255, 255, 255, 0.4));
}

.chat-text {
  color: white;
  font-weight: bold;
  font-size: 16px;
  background: linear-gradient(135deg, #ffffff, #dbeafe);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 0 4px rgba(255, 255, 255, 0.25);
}

.new-message-notification {
  position: absolute;
  top: -40px;
  right: -10px;
  background: linear-gradient(135deg, #0ea5e9, #2563eb);
  color: white;
  font-size: 14px;
  font-weight: 700;
  padding: 8px 16px;
  border-radius: 24px;
  box-shadow: 0 10px 20px rgba(37, 99, 235, 0.24);
  animation: pulse 2s infinite;
  user-select: none;
  pointer-events: none;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

@keyframes pulse {
  0% {
    transform: scale(1);
    box-shadow: 0 2px 8px rgba(255, 59, 59, 0.6);
  }
  50% {
    transform: scale(1.1);
    box-shadow: 0 4px 12px rgba(255, 59, 59, 0.8);
  }
  100% {
    transform: scale(1);
    box-shadow: 0 2px 8px rgba(255, 59, 59, 0.6);
  }
}

.chat-window {
  width: 450px;
  height: 550px;
  background: rgba(255, 255, 255, 0.96);
  backdrop-filter: blur(18px);
  border: 1px solid rgba(148, 163, 184, 0.18);
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(15, 23, 42, 0.16);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  color: #334155;
}

.chat-header {
  background: linear-gradient(135deg, #ffffff 0%, #eff6ff 100%);
  padding: 12px 16px;
  font-weight: 600;
  font-size: 16px;
  color: #0f172a;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(148, 163, 184, 0.12);
}

.header-loading-container {
  display: flex;
  align-items: center;
  margin-left: auto;
  margin-right: 12px;
}

.close-btn {
  background: none;
  border: none;
  color: #64748b;
  font-size: 24px;
  cursor: pointer;
  line-height: 1;
  padding: 0;
  transition: color 0.2s ease;
}

.close-btn:hover {
  color: #0f172a;
}

.clear-btn {
  background: linear-gradient(135deg, #eff6ff, #dbeafe);
  border: 1px solid rgba(37, 99, 235, 0.18);
  color: #1d4ed8;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  padding: 6px 12px;
  border-radius: 8px;
  transition: all 0.3s ease;
  margin-right: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  position: relative;
  overflow: hidden;
}

.clear-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 107, 107, 0.1), transparent);
  transition: left 0.5s ease;
}

.clear-btn:hover {
  background: linear-gradient(135deg, #2563eb, #4f46e5);
  border-color: transparent;
  color: #fff;
  transform: translateY(-1px);
  box-shadow: 0 8px 16px rgba(37, 99, 235, 0.22);
}

.clear-btn:hover::before {
  left: 100%;
}

.clear-btn:active {
  transform: translateY(0);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.chat-messages {
  flex: 1;
  padding: 12px 16px;
  overflow-y: auto;
  font-size: 14px;
  line-height: 1.4;
  scrollbar-width: thin;
  scrollbar-color: #cbd5e1 #eff6ff;
}

.chat-messages::-webkit-scrollbar {
  width: 8px;
}

.chat-messages::-webkit-scrollbar-track {
  background: #eff6ff;
  border-radius: 8px;
}

.chat-messages::-webkit-scrollbar-thumb {
  background-color: #cbd5e1;
  border-radius: 8px;
  border: 2px solid #eff6ff;
}

.message {
  margin-bottom: 16px;
  max-width: 100%;
  word-wrap: break-word;
}

.message-content {
  display: flex;
  align-items: flex-start;
  gap: 8px;
}

.message-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
}

.message-body {
  flex: 1;
  min-width: 0;
}

.message-body .message-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
  font-size: 14px;
}

.message-body .message-header strong {
  color: #0f172a;
  font-weight: 600;
  font-size: 14px;
}

.message-body .message-time {
  color: #94a3b8;
  font-size: 10px;
  font-weight: 400;
  font-style: italic;
}

.sender-info {
  display: flex;
  align-items: center;
}

.message-role {
  display: inline-block;
  background-color: rgba(37, 99, 235, 0.1);
  padding: 1px 4px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 500;
  margin-left: 4px;
  color: #2563eb;
}

.message-body .message-text {
  word-wrap: break-word;
  line-height: 1.4;
  padding: 8px 12px;
  border-radius: 14px;
  background: #f8fbff;
  border: 1px solid rgba(148, 163, 184, 0.16);
  color: #334155;
  font-size: 14px;
  max-width: 95%;
  white-space: pre-wrap;
}

.message.own {
  margin-left: auto;
}

.message.own .message-content {
  flex-direction: row-reverse;
}

.message.own .message-body .message-text {
  background: linear-gradient(135deg, #2563eb, #4f46e5);
  color: white;
  text-align: right;
}

.message.own .message-body .message-header {
  flex-direction: row-reverse;
}

.message.own .sender-info {
  flex-direction: row-reverse;
  gap: 4px;
}

.message-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
  font-size: 12px;
}

.message-header strong {
  color: #0f172a;
  font-weight: 600;
}

.message-time {
  color: #94a3b8;
  font-size: 11px;
  font-weight: 400;
}

.message-text {
  word-wrap: break-word;
  line-height: 1.4;
}

.message-audio {
  padding: 8px 12px;
  border-radius: 14px;
  background: #f8fbff;
  border: 1px solid rgba(148, 163, 184, 0.16);
  color: #334155;
  font-size: 14px;
  max-width: 95%;
}

.message.own .message-audio {
  background: linear-gradient(135deg, #2563eb, #4f46e5);
  color: white;
}

.chat-input {
  padding: 12px 16px;
  border-top: 1px solid rgba(148, 163, 184, 0.12);
  background: linear-gradient(180deg, #ffffff 0%, #f8fbff 100%);
}

.input-container {
  position: relative;
}

.chat-input textarea {
  width: 100%;
  padding: 8px 104px 8px 12px;
  border: 1px solid rgba(148, 163, 184, 0.18);
  border-radius: 14px;
  background-color: #ffffff;
  color: #0f172a;
  font-size: 14px;
  outline: none;
  transition: background-color 0.2s ease;
  resize: vertical;
  font-family: inherit;
}

.input-container.recording .chat-input textarea {
  padding-right: 136px;
}

.chat-input textarea::placeholder {
  color: #94a3b8;
}

.chat-input textarea:focus {
  background-color: #ffffff;
  color: #0f172a;
  border-color: rgba(37, 99, 235, 0.3);
  box-shadow: 0 0 0 0.18rem rgba(37, 99, 235, 0.1);
}

.chat-input textarea:disabled {
  background-color: #f1f5f9;
  color: #94a3b8;
  cursor: not-allowed;
}

.send-icon {
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  padding: 4px;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.2s ease;
}

.send-icon:hover:not(:disabled) {
  background-color: rgba(37, 99, 235, 0.08);
}

.send-icon:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.send-icon-svg {
  width: 20px;
  height: 20px;
  stroke: #2563eb;
}

.send-icon.typing .send-icon-svg {
  stroke: #16a34a;
}

.typing-indicator {
  font-size: 10px;
  color: #64748b;
  margin-top: 4px;
}

.emoji-icon {
  position: absolute;
  right: 40px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  padding: 4px;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.2s ease;
}

.emoji-icon:hover:not(:disabled) {
  background-color: rgba(37, 99, 235, 0.08);
}

.emoji-icon:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.emoji-icon-svg {
  width: 20px;
  height: 20px;
  stroke: #64748b;
}

.mic-icon {
  position: absolute;
  right: 72px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  padding: 4px;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.2s ease;
}

.mic-icon:hover:not(:disabled) {
  background-color: rgba(37, 99, 235, 0.08);
}

.mic-icon:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.mic-icon-svg {
  width: 20px;
  height: 20px;
  stroke: #64748b;
}

.mic-icon.recording .mic-icon-svg {
  stroke: #ef4444;
}

.recording-status {
  position: absolute;
  right: 104px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: #64748b;
  font-weight: 500;
}

.recording-dot {
  width: 8px;
  height: 8px;
  background-color: #ef4444;
  border-radius: 50%;
  animation: recording-pulse 1s infinite;
}

.stop-icon {
  position: absolute;
  right: 72px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  padding: 4px;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.2s ease;
}

.stop-icon:hover:not(:disabled) {
  background-color: rgba(37, 99, 235, 0.08);
}

.stop-icon:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.stop-icon-svg {
  width: 20px;
  height: 20px;
  stroke: #64748b;
}

@keyframes recording-pulse {
  0% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.5;
    transform: scale(1.2);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

.emoji-picker {
  position: absolute;
  bottom: 100%;
  right: 0;
  background: rgba(255, 255, 255, 0.98);
  border: 1px solid rgba(148, 163, 184, 0.16);
  border-radius: 16px;
  box-shadow: 0 14px 28px rgba(15, 23, 42, 0.12);
  padding: 8px;
  z-index: 10;
  max-width: 300px;
}

.emoji-grid {
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  gap: 4px;
}

.emoji-item {
  font-size: 20px;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  transition: background-color 0.2s ease;
}

.emoji-item:hover {
  background-color: rgba(37, 99, 235, 0.08);
}

.emoji-pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 8px;
  gap: 12px;
}

.emoji-pagination button {
  background: linear-gradient(135deg, #2563eb, #4f46e5);
  border: none;
  color: white;
  padding: 4px 12px;
  border-radius: 999px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.2s ease;
}

.emoji-pagination button:disabled {
  background-color: #cbd5e1;
  cursor: not-allowed;
}

.emoji-pagination button:hover:not(:disabled) {
  background: linear-gradient(135deg, #1d4ed8, #4338ca);
}

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  color: #64748b;
  font-size: 14px;
}

.loading-spinner {
  width: 32px;
  height: 32px;
  border: 3px solid #dbeafe;
  border-top: 3px solid #2563eb;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 12px;
}

.loading-text {
  color: #64748b;
  font-size: 14px;
  font-weight: 500;
}

.role-admin {
  color: #dc2626;
  font-weight: 600;
  font-style: italic;
}

.role-kepala {
  color: #0f766e;
  font-weight: 600;
  font-style: italic;
}

.role-kasi {
  color: #0284c7;
  font-weight: 600;
  font-style: italic;
}

.role-kasubbag {
  color: #b45309;
  font-weight: 600;
  font-style: italic;
}

.role-petugas {
  color: #7c3aed;
  font-weight: 600;
  font-style: italic;
}

.role-pegawai {
  color: #64748b;
  font-weight: 600;
  font-style: italic;
}

.role-ptsp {
  color: #16a34a;
  font-weight: 600;
  font-style: italic;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.guest-name-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(15, 23, 42, 0.52);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
}

.modal-content {
  background: rgba(255, 255, 255, 0.98);
  border: 1px solid rgba(148, 163, 184, 0.16);
  padding: 24px;
  border-radius: 18px;
  box-shadow: 0 18px 40px rgba(15, 23, 42, 0.16);
  max-width: 400px;
  width: 90%;
  text-align: center;
  color: #334155;
}

.modal-content h3 {
  margin: 0 0 12px 0;
  font-size: 20px;
  font-weight: 600;
  color: #0f172a;
}

.modal-content p {
  margin: 0 0 20px 0;
  font-size: 14px;
  color: #64748b;
}

.modal-name-input {
  width: 100%;
  padding: 12px;
  border: 1px solid rgba(148, 163, 184, 0.18);
  border-radius: 14px;
  background-color: #ffffff;
  color: #0f172a;
  font-size: 14px;
  outline: none;
  margin-bottom: 16px;
  font-family: inherit;
}

.modal-name-input::placeholder {
  color: #94a3b8;
}

.modal-name-input:focus {
  background-color: #ffffff;
  color: #0f172a;
  border-color: rgba(37, 99, 235, 0.3);
  box-shadow: 0 0 0 0.18rem rgba(37, 99, 235, 0.1);
}

.modal-start-btn {
  background: linear-gradient(135deg, #2563eb, #4f46e5);
  border: none;
  color: white;
  padding: 12px 24px;
  border-radius: 14px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  transition: background-color 0.2s ease;
}

.modal-start-btn:hover:not(:disabled) {
  background: linear-gradient(135deg, #1d4ed8, #4338ca);
}

.modal-start-btn:disabled {
  background-color: #cbd5e1;
  cursor: not-allowed;
  opacity: 0.5;
}

/* Notification Modal Styles */
.notification-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(15, 23, 42, 0.52);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
}

.modal-enable-btn {
  background: linear-gradient(135deg, #2563eb, #4f46e5);
  border: none;
  color: white;
  padding: 12px 24px;
  border-radius: 14px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  transition: background-color 0.2s ease;
  margin-right: 10px;
}

.modal-enable-btn:hover:not(:disabled) {
  background: linear-gradient(135deg, #1d4ed8, #4338ca);
}

.modal-close-btn {
  background-color: #e2e8f0;
  border: none;
  color: #334155;
  padding: 12px 24px;
  border-radius: 14px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  transition: background-color 0.2s ease;
}

.modal-close-btn:hover {
  background-color: #cbd5e1;
}

/* Mobile Responsiveness */
@media (max-width: 600px) {
  .chat-icon {
    width: 100px;
    height: 48px;
    border-radius: 24px;
  }

  .chat-icon-svg {
    width: 24px;
    height: 24px;
  }

  .chat-text {
    font-size: 14px;
  }

  .chat-window {
    width: 90vw;
    height: 80vh;
    max-width: none;
    max-height: none;
  }

  .modal-content {
    max-width: 90vw;
    width: 90vw;
  }

  .emoji-picker {
    max-width: 80vw;
  }
}
</style>
