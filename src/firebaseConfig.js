// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken } from 'firebase/messaging';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// Replace these values with your Firebase project config
const firebaseConfig = {
    apiKey: "AIzaSyBidzPGWtNPp05KoHHcgg71kWyiG62uA4w",
    authDomain: "silatar-70f7a.firebaseapp.com",
    projectId: "silatar-70f7a",
    storageBucket: "silatar-70f7a.firebasestorage.app",
    messagingSenderId: "479694444629",
    appId: "1:479694444629:web:02f2736d6c6a8cd3441cdc",
    measurementId: "G-NG2GTYBZDC"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Cloud Messaging and get a reference to the service
export const messaging = getMessaging(app);

// Function to get FCM token with VAPID key
export const getFCMToken = async () => {
  try {
    const vapidKey = 'BIewP2JrffFLWZwVbo4b8WTwqgK0zgmzo0mD523U5p-gcUQRBuxTn8EiUswNQi9UICrHkzHIrb18hklyIKFpXqA';
    const token = await getToken(messaging, { vapidKey });
    return token;
  } catch (error) {
    console.error('Error getting FCM token:', error);
    return null;
  }
};
