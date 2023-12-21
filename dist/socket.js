"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function handleSocket(http) {
    const io = require("socket.io")(http, {
        cors: {
            origin: "http://localhost:5173",
        },
    });
    io.on("connection", (socket) => {
        console.log(`⚡: ${socket.id} user just connected!`);
        socket.on("disconnect", () => {
            console.log("🔥: A user disconnected");
        });
        socket.on("test", (message) => {
            console.log(message);
            io.sockets.emit("test2", { message: message });
        });
    });
}
exports.default = handleSocket;
