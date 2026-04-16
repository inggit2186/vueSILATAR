// Lightweight chat service using Socket.io
// No external dependencies like Firebase

class ChatService {
  constructor() {
    this.socket = null;
  }

  // Get the socket instance (either existing or new)
  getSocket() {
    if (!this.socket) {
      // Dynamic import to avoid issues if socket.io-client is not installed
      import('socket.io-client').then(({ io }) => {
        this.socket = io(import.meta.env.VITE_SOCKET_URL || 'https://node.kemenagtd.top', {
          transports: ['websocket', 'polling']
        });
      });
    }
    return this.socket;
  }

  // Clear all messages - emits event to server
  async clearAllMessages() {
    return new Promise((resolve, reject) => {
      // Get socket from window if available (ChatWidget's socket)
      const socket = window.__CHAT_SOCKET__ || this.getSocket();
      
      if (!socket) {
        reject(new Error('Socket not initialized'));
        return;
      }

      // Wait for socket to be connected
      if (socket.connected) {
        socket.emit('clear_messages', (response) => {
          if (response && response.success) {
            resolve();
          } else {
            reject(new Error(response?.error || 'Failed to clear messages'));
          }
        });
      } else {
        // Wait for connection
        socket.on('connect', () => {
          socket.emit('clear_messages', (response) => {
            if (response && response.success) {
              resolve();
            } else {
              reject(new Error(response?.error || 'Failed to clear messages'));
            }
          });
        });
      }
    });
  }

  // Initialize with existing socket (call from ChatWidget)
  setSocket(socket) {
    this.socket = socket;
    // Also set on window for easy access
    window.__CHAT_SOCKET__ = socket;
  }
}

export default new ChatService();
