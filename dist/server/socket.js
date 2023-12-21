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
        socket.on("sendMessage", (wrapped) => {
            console.log(`💬 New message: ${wrapped.data.content}`);
            socket.emit("messageConfirmation", new Date());
            io.sockets.emit("newMessage", { message: wrapped.data });
        });
    });
}
exports.default = handleSocket;
