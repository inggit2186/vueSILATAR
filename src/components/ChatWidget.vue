<template>
  <div class="chat-widget">
    <div v-if="!isOpen" class="chat-icon" @click="toggleChat" title="Open chat">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="chat-icon-svg">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2z"></path>
      </svg>
    </div>
    <div v-else class="chat-window">
      <div class="chat-header">
        <span>Live Chat</span>
        <button @click="toggleChat" class="close-btn" aria-label="Close chat">&times;</button>
      </div>
      <div class="chat-messages" ref="messagesContainer" tabindex="0" aria-live="polite" aria-atomic="false">
        <div v-for="message in messages" :key="message.id" class="message" :class="{ 'own': message.sender === currentUser.name }">
          <strong>{{ message.sender }}:</strong> {{ message.text }}
        </div>
      </div>
      <div class="chat-input">
        <input v-model="newMessage" @keyup.enter="sendMessage" placeholder="Type a message..." :disabled="!isAuthenticated" aria-label="Type your message" />
        <button @click="sendMessage" :disabled="!isAuthenticated" aria-label="Send message">Send</button>
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
      pollingInterval: null
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
    toggleChat() {
      this.isOpen = !this.isOpen;
      if (this.isOpen) {
        this.$nextTick(() => {
          this.scrollToBottom();
          this.$refs.messagesContainer.focus();
        });
      }
    },
    async sendMessage() {
      if (!this.newMessage.trim() || !this.isAuthenticated) return;

      try {
        const headers = {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        };
        const response = await this.$axios.post(import.meta.env.VITE_APP_API_URL + '/livechat', {
          user: this.currentUser.id,
          message: this.newMessage.trim()
        }, { headers });

        if (response.data.success) {
          this.messages.push({
            id: Date.now(),
            sender: this.currentUser.name,
            text: this.newMessage.trim()
          });
          this.newMessage = '';
          this.$nextTick(() => {
            this.scrollToBottom();
          });
        }
      } catch (error) {
        console.error('Error sending message:', error);
      }
    },
    async fetchMessages() {
      if (!this.isAuthenticated) return;

      try {
        const headers = {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        };
        const response = await this.$axios.get(import.meta.env.VITE_APP_API_URL + '/livechat/messages', { headers });
        if (response.data.success) {
          this.messages = response.data.messages;
        }
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    },
    startPolling() {
      this.pollingInterval = setInterval(this.fetchMessages, 5000);
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
  background-color: #5865f2;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 8px 24px rgba(88, 101, 242, 0.48);
  transition: background-color 0.3s ease;
}

.chat-icon:hover {
  background-color: #4752c4;
}

.chat-icon-svg {
  width: 28px;
  height: 28px;
  stroke: white;
}

.chat-window {
  width: 320px;
  height: 420px;
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
  margin-bottom: 10px;
  padding: 8px 12px;
  border-radius: 8px;
  background-color: #36393f;
  color: #dcddde;
  max-width: 80%;
  word-wrap: break-word;
}

.message.own {
  background-color: #5865f2;
  color: white;
  margin-left: auto;
  text-align: right;
}

.chat-input {
  display: flex;
  padding: 12px 16px;
  border-top: 1px solid #292b2f;
  background-color: #202225;
}

.chat-input input {
  flex: 1;
  padding: 8px 12px;
  border: none;
  border-radius: 6px;
  background-color: #40444b;
  color: #dcddde;
  font-size: 14px;
  outline: none;
  transition: background-color 0.2s ease;
}

.chat-input input::placeholder {
  color: #72767d;
}

.chat-input input:focus {
  background-color: #5865f2;
  color: white;
}

.chat-input input:disabled {
  background-color: #2f3136;
  color: #72767d;
  cursor: not-allowed;
}

.chat-input button {
  margin-left: 8px;
  padding: 8px 16px;
  background-color: #5865f2;
  border: none;
  border-radius: 6px;
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.chat-input button:hover:not(:disabled) {
  background-color: #4752c4;
}

.chat-input button:disabled {
  background-color: #2f3136;
  cursor: not-allowed;
}
</style>
