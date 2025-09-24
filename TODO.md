# TODO: Fix Firebase Notifications Not Appearing

## Tasks
- [x] Update src/App.vue: Move FCM setup here (imports, permission request, token generation, onMessage listener)
- [ ] Update src/components/ChatWidget.vue: Remove FCM-related code (imports, mounted setup)
- [ ] Update public/firebase-messaging-sw.js: Add logging for background messages
- [ ] Test: Open app, check console for FCM token, use in Firebase console test message
- [ ] Verify: Notification permission granted, logs appear on test message
