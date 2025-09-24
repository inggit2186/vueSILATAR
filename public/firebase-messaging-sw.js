importScripts('https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.22.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyBidzPGWtNPp05KoHHcgg71kWyiG62uA4w",
  authDomain: "silatar-70f7a.firebaseapp.com",
  projectId: "silatar-70f7a",
  storageBucket: "silatar-70f7a.firebasestorage.app",
  messagingSenderId: "479694444629",
  appId: "1:479694444629:web:02f2736d6c6a8cd3441cdc",
  measurementId: "G-NG2GTYBZDC"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('Received background message ', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.icon
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});
