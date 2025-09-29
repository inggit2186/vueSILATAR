import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  deleteDoc,
  doc,
  serverTimestamp,
  limit,
  getDocs
} from 'firebase/firestore';
import { db } from '../firebaseConfig.js';

class ChatService {
  constructor() {
    this.messagesCollection = collection(db, 'chat_messages');
    this.unsubscribe = null;
  }

  // Save a new message to Firestore
  async saveMessage(messageData) {
    try {
      const message = {
        ...messageData,
        timestamp: serverTimestamp(),
        createdAt: new Date().toISOString()
      };

      const docRef = await addDoc(this.messagesCollection, message);
      return docRef.id;
    } catch (error) {
      console.error('Error saving message to database:', error);
      throw error;
    }
  }

  // Get messages from Firestore (one-time fetch)
  async getMessages() {
    try {
      // Query messages ordered by timestamp, limit to last 100 messages
      const q = query(
        this.messagesCollection,
        orderBy('timestamp', 'asc'),
        limit(100)
      );

      const querySnapshot = await getDocs(q);
      const messages = [];

      querySnapshot.forEach((doc) => {
        const messageData = doc.data();
        messages.push({
          id: doc.id,
          ...messageData,
          // Convert Firestore timestamp to JavaScript Date
          time: messageData.timestamp?.toDate?.() || new Date(messageData.createdAt)
        });
      });

      return messages;
    } catch (error) {
      console.error('Error getting messages from database:', error);
      return [];
    }
  }

  // Load messages from Firestore with real-time updates
  loadMessages(callback) {
    try {
      // Query messages ordered by timestamp, limit to last 100 messages
      const q = query(
        this.messagesCollection,
        orderBy('timestamp', 'asc'),
        limit(100)
      );

      this.unsubscribe = onSnapshot(q, (querySnapshot) => {
        const messages = [];
        querySnapshot.forEach((doc) => {
          const messageData = doc.data();
          messages.push({
            id: doc.id,
            ...messageData,
            // Convert Firestore timestamp to JavaScript Date
            time: messageData.timestamp?.toDate?.() || new Date(messageData.createdAt)
          });
        });
        callback(messages);
      }, (error) => {
        console.error('Error in Firestore listener:', error);
        // Retry logic for connection errors
        if (error.code === 'unavailable' || error.code === 'deadline-exceeded') {
          console.log('Retrying Firestore connection in 5 seconds...');
          setTimeout(() => {
            this.loadMessages(callback);
          }, 5000);
        } else {
          callback([]);
        }
      });
    } catch (error) {
      console.error('Error setting up Firestore listener:', error);
      // Retry setup after a delay
      setTimeout(() => {
        this.loadMessages(callback);
      }, 3000);
      callback([]);
    }
  }

  // Clear all messages from database
  async clearAllMessages() {
    try {
      // Note: In a real application, you might want to add admin checks here
      const q = query(this.messagesCollection);
      const querySnapshot = await getDocs(q);

      const deletePromises = [];
      querySnapshot.forEach((document) => {
        deletePromises.push(deleteDoc(doc(db, 'chat_messages', document.id)));
      });

      await Promise.all(deletePromises);
      console.log('All messages cleared from database');
    } catch (error) {
      console.error('Error clearing messages from database:', error);
      throw error;
    }
  }

  // Stop listening to real-time updates
  unsubscribeFromMessages() {
    if (this.unsubscribe) {
      this.unsubscribe();
      this.unsubscribe = null;
    }
  }
}

export default new ChatService();
