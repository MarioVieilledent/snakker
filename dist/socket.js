"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function handleSocket(http) {
    const io = require("socket.io")(http, {
        cors: {
            origin: "http://localhost:5173",
        },
    });
    io.on("connection", (socket) => {
        console.log(`✅ ${socket.id} user just connected!`);
        socket.on("disconnect", () => {
            console.log("❌ A user disconnected");
        });
        // When a user send a message
        socket.on("sendMessage", (wrapped) => {
            console.log(`💬 New message: ${wrapped.data.content}`);
            // Send the user the message had been sent correctly
            socket.emit("messageConfirmation", wrapped.data);
            // Send the message to all other user connected
            io.sockets.emit("newMessage", { message: wrapped.data });
        });
    });
}
exports.default = handleSocket;
