- [x] Reorder elements in desktop view: kegiatan input, volume input, satuan select, mic button
- [x] Change mic button variant to 'success' when not listening, 'danger' when listening
- [x] Adjust max-widths and margins for proper layout in desktop
- [x] Reorder elements in mobile view: kegiatan input, volume input, satuan select, mic button
- [x] Adjust margins in mobile for better spacing
- [x] Make mic button round with same height as input boxes
- [x] Add small recording status indicator when recording
- [ ] Test the layout by running the development server

Chat Widget Guest PP and Role Update:
- [x] Modify toggleChat method to set pp = 'assets/img/defaultpp.png' for guests
- [x] Modify sendMessage method to set pp = 'assets/img/defaultpp.png' and role = 'guest' for guests

Add Clear All Chat Button for Admin:
- [x] Add "Clear All" button in chat header for admin role
- [x] Implement clearAllMessages method to emit clear_messages event
- [x] Add socket listener for clear_messages to clear messages array
- [x] Add CSS styling for the clear button
