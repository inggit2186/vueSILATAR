<template>
  <div class="chat-widget">
<div v-if="!isOpen" class="chat-icon" @click.stop="toggleChat" title="Open chat">
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="chat-icon-svg">
    <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"></path>
  </svg>
  <div v-if="hasNewMessage" class="new-message-notification">Pesan Baru !!</div>
</div>
    <div v-else ref="chatWindow" class="chat-window" @click.stop>
      <div class="chat-header">
        <span>Live Chat</span>
        <button @click="toggleChat" class="close-btn" aria-label="Close chat">&times;</button>
      </div>
      <div class="chat-messages" ref="messagesContainer" tabindex="0" aria-live="polite" aria-atomic="false">
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
                <audio controls :src="'data:audio/wav;base64,' + message.text"></audio>
              </div>
              <div v-else class="message-text">{{ message.text }}</div>
            </div>
          </div>
        </div>
      </div>

      <div class="chat-input">
        <div class="input-container" :class="{ 'recording': isRecording }">
          <textarea
            v-model="newMessage"
            @keydown.enter="handleEnter"
            @input="onInput"
            placeholder="Type a message..."
            :disabled="!(isAuthenticated || guestName) || isSending"
            aria-label="Type your message"
            ref="messageTextarea"
            style="overflow:hidden;resize:none"
          ></textarea>
          <div v-if="isRecording" class="recording-status">
            <div class="recording-dot"></div>
            <span>Recording...</span>
          </div>
          <button v-if="!isRecording" class="mic-icon" @click="toggleRecording" :disabled="!(isAuthenticated || guestName) || isSending" aria-label="Record voice message">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mic-icon-svg">
              <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
              <path d="M19 10v1a7 7 0 0 1-14 0v-1"></path>
              <line x1="12" y1="19" x2="12" y2="23"></line>
              <line x1="8" y1="23" x2="16" y2="23"></line>
            </svg>
          </button>
          <button v-else class="stop-icon" @click="stopRecording" :disabled="!(isAuthenticated || guestName) || isSending" aria-label="Stop recording">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="stop-icon-svg">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
            </svg>
          </button>
          <button class="emoji-icon" @click="toggleEmojiPicker" :disabled="!(isAuthenticated || guestName) || isSending" aria-label="Open emoji picker">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="emoji-icon-svg">
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
              <line x1="9" y1="9" x2="9.01" y2="9"></line>
              <line x1="15" y1="9" x2="15.01" y2="9"></line>
            </svg>
          </button>
          <button class="send-icon" :class="{ 'typing': newMessage.trim() || audioUrl }" @click="sendMessage" :disabled="!(isAuthenticated || guestName) || isSending" aria-label="Send message">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="send-icon-svg">
              <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"></path>
            </svg>
          </button>
          <div v-if="showEmojiPicker" class="emoji-picker">
            <div class="emoji-grid">
              <span v-for="emoji in pagedEmojis" :key="emoji" @click="insertEmoji(emoji)" class="emoji-item">{{ emoji }}</span>
            </div>
            <div class="emoji-pagination">
              <button @click="prevEmojiPage" :disabled="emojiPage === 1" aria-label="Previous emoji page">Prev</button>
              <span>Page {{ emojiPage }} / {{ totalEmojiPages }}</span>
              <button @click="nextEmojiPage" :disabled="emojiPage === totalEmojiPages" aria-label="Next emoji page">Next</button>
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
          v-model="nameInput"
          @keydown.enter="setGuestName"
          placeholder="Masukkan Nama"
          class="modal-name-input"
          ref="nameInputRef"
        />
        <button @click="setGuestName" class="modal-start-btn" :disabled="!nameInput.trim()">Start Chatting</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChatWidget',
  data() {
    return {
      isOpen: false,
      messages: [],
      newMessage: '',
      currentUser: null,
      isAuthenticated: false,
      guestName: '',
      nameInput: '',
      pollingInterval: null,
      isLoading: false,
      isFirstFetch: true,
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
    this.startPolling();
  },
  beforeUnmount() {
    this.stopPolling();
  },
  methods: {
    checkAuth() {
      const token = localStorage.getItem('token');
      const user = localStorage.getItem('user');
      if (token && user) {
        this.isAuthenticated = true;
        this.currentUser = JSON.parse(user);
      }
    },
    async toggleChat() {
      if (!this.isOpen) {
        this.isOpen = true;
        await this.fetchMessages();
        this.hasNewMessage = false;
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
      let sauth, userid, user, pp, role;

      if (!this.isAuthenticated) {
        sauth = 'guest';
        userid = null;
        user = this.guestName;
        pp = null;
        role = null;
      } else {
        sauth = 'auth';
        userid = this.currentUser.id;
        user = this.currentUser.name;
        pp = this.currentUser.pp;
        role = this.currentUser.role;
      }

      this.isSending = true;
      try {
        const headers = {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        };
        let messageData = {
          sauth: sauth,
          userid: userid,
          user: user,
        };
        if (this.audioUrl) {
          messageData.message = this.audioBase64;
          messageData.type = 'audio';
        } else {
          messageData.message = this.newMessage;
          messageData.type = 'text';
        }
        const response = await this.$axios.post(import.meta.env.VITE_APP_API_URL + '/livechat', messageData, { headers });

        if (response.data.success) {
          this.messages.push({
            id: Date.now(),
            sender: user,
            text: this.audioUrl ? this.audioBase64 : this.newMessage,
            type: this.audioUrl ? 'audio' : 'text',
            pp: pp,
            role: role,
            time: new Date().toISOString()
          });
          this.newMessage = '';
          this.audioUrl = null;
          this.audioBase64 = null;
          this.$nextTick(() => {
            this.scrollToBottom();
          });
        }
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

    async fetchMessages() {
      const wasFirstFetch = this.isFirstFetch;
      if (wasFirstFetch) {
        this.isLoading = true;
      }
      try {
        const headers = {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        };
        const response = await this.$axios.get(import.meta.env.VITE_APP_API_URL + '/livechat/messages', { headers });
        if (response.data.success) {
          // Check for new messages when chat is closed
          if (!this.isOpen && this.messages.length < response.data.data.length) {
            this.hasNewMessage = true;
          }
          this.messages = response.data.data;
          if (wasFirstFetch) {
            this.isFirstFetch = false;
          }
        }
      } catch (error) {
        console.error('Error fetching messages:', error);
      } finally {
        if (wasFirstFetch) {
          this.isLoading = false;
        }
      }
    },
    startPolling() {
      this.pollingInterval = setInterval(this.fetchMessages, 3000);
    },
    stopPolling() {
      if (this.pollingInterval) {
        clearInterval(this.pollingInterval);
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
          const audioBlob = new Blob(this.audioChunks, { type: 'audio/wav' });
          const reader = new FileReader();
          reader.onload = () => {
            this.audioBase64 = reader.result.split(',')[1]; // remove data:audio/wav;base64,
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
      }
    },
    async stopRecording() {
      if (this.mediaRecorder && this.isRecording) {
        this.mediaRecorder.stop();
        this.isRecording = false;
      }
    },
    playAudio(message) {
      // Optional: track play events if needed
    }
  }
}
</script>

<style scoped>
.chat-widget {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 1000;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  user-select: none;
}

.chat-icon {
  width: 56px;
  height: 56px;
  background: linear-gradient(135deg, #6e8efb, #a777e3);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 0 15px 3px rgba(110, 142, 251, 0.7);
  transition: background 0.3s ease, box-shadow 0.3s ease;
}
.chat-icon:hover {
  background: linear-gradient(135deg, #a777e3, #6e8efb);
  box-shadow: 0 0 20px 5px rgba(167, 119, 227, 0.8);
}

.chat-icon:hover {
  background-color: #4752c4;
}

.chat-icon-svg {
  width: 28px;
  height: 28px;
  stroke: white;
  filter: drop-shadow(0 0 2px rgba(255, 255, 255, 0.7));
  transition: filter 0.3s ease;
}
.chat-icon:hover .chat-icon-svg {
  filter: drop-shadow(0 0 4px rgba(255, 255, 255, 1));
}

.new-message-notification {
  position: absolute;
  top: -40px;
  right: -10px;
  background: linear-gradient(135deg, #ff6b6b, #ff3b3b);
  color: white;
  font-size: 14px;
  font-weight: 700;
  padding: 8px 16px;
  border-radius: 24px;
  box-shadow: 0 4px 12px rgba(255, 59, 59, 0.8);
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
  background-color: #2f3136;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.7);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  color: #dcddde;
}

.chat-header {
  background-color: #202225;
  padding: 12px 16px;
  font-weight: 600;
  font-size: 16px;
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #292b2f;
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
  color: #b9bbbe;
  font-size: 24px;
  cursor: pointer;
  line-height: 1;
  padding: 0;
  transition: color 0.2s ease;
}

.close-btn:hover {
  color: #fff;
}

.chat-messages {
  flex: 1;
  padding: 12px 16px;
  overflow-y: auto;
  font-size: 14px;
  line-height: 1.4;
  scrollbar-width: thin;
  scrollbar-color: #202225 #2f3136;
}

.chat-messages::-webkit-scrollbar {
  width: 8px;
}

.chat-messages::-webkit-scrollbar-track {
  background: #2f3136;
  border-radius: 8px;
}

.chat-messages::-webkit-scrollbar-thumb {
  background-color: #202225;
  border-radius: 8px;
  border: 2px solid #2f3136;
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
  color: #fff;
  font-weight: 600;
  font-size: 14px;
}

.message-body .message-time {
  color: #b9bbbe;
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
  background-color: rgba(0, 0, 0, 0.3);
  padding: 1px 4px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 500;
  margin-left: 4px;
}

.message-body .message-text {
  word-wrap: break-word;
  line-height: 1.4;
  padding: 8px 12px;
  border-radius: 8px;
  background-color: #36393f;
  color: #dcddde;
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
  background-color: #5865f2;
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
  color: #fff;
  font-weight: 600;
}

.message-time {
  color: #b9bbbe;
  font-size: 11px;
  font-weight: 400;
}

.message-text {
  word-wrap: break-word;
  line-height: 1.4;
}

.message-audio {
  padding: 8px 12px;
  border-radius: 8px;
  background-color: #36393f;
  color: #dcddde;
  font-size: 14px;
  max-width: 95%;
}

.message.own .message-audio {
  background-color: #5865f2;
  color: white;
}

.chat-input {
  padding: 12px 16px;
  border-top: 1px solid #292b2f;
  background-color: #202225;
}

.input-container {
  position: relative;
}

.chat-input textarea {
  width: 100%;
  padding: 8px 104px 8px 12px;
  border: none;
  border-radius: 6px;
  background-color: #40444b;
  color: #dcddde;
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
  color: #72767d;
}

.chat-input textarea:focus {
  background-color: #5865f2;
  color: white;
}

.chat-input textarea:disabled {
  background-color: #2f3136;
  color: #72767d;
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
  background-color: rgba(88, 101, 242, 0.1);
}

.send-icon:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.send-icon-svg {
  width: 20px;
  height: 20px;
  stroke: #5865f2;
}

.send-icon.typing .send-icon-svg {
  stroke: greenyellow;
}

.typing-indicator {
  font-size: 10px;
  color: #b9bbbe;
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
  background-color: rgba(88, 101, 242, 0.1);
}

.emoji-icon:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.emoji-icon-svg {
  width: 20px;
  height: 20px;
  stroke: #b9bbbe;
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
  background-color: rgba(88, 101, 242, 0.1);
}

.mic-icon:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.mic-icon-svg {
  width: 20px;
  height: 20px;
  stroke: #b9bbbe;
}

.mic-icon.recording .mic-icon-svg {
  stroke: red;
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
  color: #b9bbbe;
  font-weight: 500;
}

.recording-dot {
  width: 8px;
  height: 8px;
  background-color: red;
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
  background-color: rgba(88, 101, 242, 0.1);
}

.stop-icon:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.stop-icon-svg {
  width: 20px;
  height: 20px;
  stroke: #b9bbbe;
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
  background-color: #36393f;
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.5);
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
  background-color: rgba(88, 101, 242, 0.1);
}

.emoji-pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 8px;
  gap: 12px;
}

.emoji-pagination button {
  background-color: #5865f2;
  border: none;
  color: white;
  padding: 4px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.2s ease;
}

.emoji-pagination button:disabled {
  background-color: #40444b;
  cursor: not-allowed;
}

.emoji-pagination button:hover:not(:disabled) {
  background-color: #4752c4;
}

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  color: #b9bbbe;
  font-size: 14px;
}

.loading-spinner {
  width: 32px;
  height: 32px;
  border: 3px solid #36393f;
  border-top: 3px solid #5865f2;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 12px;
}

.loading-text {
  color: #b9bbbe;
  font-size: 14px;
  font-weight: 500;
}

.role-admin {
  color: #ff6b6b;
  font-weight: 600;
  font-style: italic;
}

.role-kepala {
  color: #4ecdc4;
  font-weight: 600;
  font-style: italic;
}

.role-kasi {
  color: #45b7d1;
  font-weight: 600;
  font-style: italic;
}

.role-kasubbag {
  color: #f9ca24;
  font-weight: 600;
  font-style: italic;
}

.role-petugas {
  color: #a55eea;
  font-weight: 600;
  font-style: italic;
}

.role-pegawai {
  color: #95a5a6;
  font-weight: 600;
  font-style: italic;
}

.role-ptsp {
  color: #2ecc71;
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
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
}

.modal-content {
  background-color: #36393f;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
  max-width: 400px;
  width: 90%;
  text-align: center;
  color: #dcddde;
}

.modal-content h3 {
  margin: 0 0 12px 0;
  font-size: 20px;
  font-weight: 600;
  color: #fff;
}

.modal-content p {
  margin: 0 0 20px 0;
  font-size: 14px;
  color: #b9bbbe;
}

.modal-name-input {
  width: 100%;
  padding: 12px;
  border: none;
  border-radius: 6px;
  background-color: #40444b;
  color: #dcddde;
  font-size: 14px;
  outline: none;
  margin-bottom: 16px;
  font-family: inherit;
}

.modal-name-input::placeholder {
  color: #72767d;
}

.modal-name-input:focus {
  background-color: #5865f2;
  color: white;
}

.modal-start-btn {
  background-color: #5865f2;
  border: none;
  color: white;
  padding: 12px 24px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  transition: background-color 0.2s ease;
}

.modal-start-btn:hover:not(:disabled) {
  background-color: #4752c4;
}

.modal-start-btn:disabled {
  background-color: #40444b;
  cursor: not-allowed;
  opacity: 0.5;
}

/* Mobile Responsiveness */
@media (max-width: 600px) {
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
