//chat.js
module.exports = (io, socket, onlineUsers) => {

    socket.on('new user', (username) => {
        //Save the username as key to access the user's socket id
        onlineUsers[username] = socket.id;
        //Save the username to socket as well. This is important for later.
        socket["username"] = username;
        console.log(`✋ ${username} has joined the chat! ✋`);
        io.emit("new user", username);
    })

    socket.on('new message', (data) => {
        console.log(`🎤 ${data.sender}: ${data.message} 🎤`)
        io.emit('new message', data);
    })

    socket.on('get online users', () => {
        //Send over the onlineUsers
        socket.emit('get online users', onlineUsers);
    })

    // This fires when a user closes out of the application
    // socket.on("disconnect") is a special listener that fires when a user exits out of the application.
    socket.on('disconnect', () => {
        //This deletes the user by using the username we saved to the socket
        delete onlineUsers[socket.username]
        io.emit('user has left', onlineUsers);
    });

    // Listen for "disconnect" socket event
    socket.on('disconnect', () => {
        console.log(`User disconnected: ${socket.username}`);
        // Remove the disconnected user from the online user list
        // Remove the corresponding element from the DOM using jQuery or plain JavaScript
        // Example: $('.users-online').find(`[data-username="${socket.username}"]`).remove();
    });

}