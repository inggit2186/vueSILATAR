// Test script to create a sample message in Firestore
// Replace the firebaseConfig with your actual Firebase configuration

const { initializeApp } = require('firebase/app');
const { getFirestore, collection, addDoc, serverTimestamp } = require('firebase/firestore');

// TODO: Replace with your actual Firebase configuration from Firebase Console
const firebaseConfig = {
    apiKey: "AIzaSyBidzPGWtNPp05KoHHcgg71kWyiG62uA4w",
    authDomain: "silatar-70f7a.firebaseapp.com",
    projectId: "silatar-70f7a",
    storageBucket: "silatar-70f7a.firebasestorage.app",
    messagingSenderId: "479694444629",
    appId: "1:479694444629:web:02f2736d6c6a8cd3441cdc",
    measurementId: "G-NG2GTYBZDC"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function createTestMessage() {
  try {
    const messagesCollection = collection(db, 'chat_messages');
    const docRef = await addDoc(messagesCollection, {
      sender: 'System',
      text: 'Welcome to the chat! This is a test message.',
      type: 'text',
      role: 'admin',
      pp: 'assets/img/defaultpp.png',
      timestamp: serverTimestamp(),
      createdAt: new Date().toISOString()
    });
    console.log('✅ Test message created successfully!');
    console.log('Document ID:', docRef.id);
    console.log('Collection: chat_messages');
    console.log('You should now see the chat_messages collection in Firebase Console');
  } catch (error) {
    console.error('❌ Error creating test message:', error.message);
    console.error('Make sure your Firebase configuration is correct and Firestore is enabled');
  }
}

createTestMessage();
