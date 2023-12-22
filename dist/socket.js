"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongo_1 = require("./mongo");
const NumberOfMessageswLoadedOnConnection = 100;
function handleSocket(http) {
    const io = require("socket.io")(http, {
        cors: {
            origin: "http://localhost:5173",
        },
    });
    io.on("connection", (socket) => {
        (0, mongo_1.getLastNDocuments)(NumberOfMessageswLoadedOnConnection)
            .then((data) => {
            socket.emit("fetchLastMessages", data);
        })
            .catch((e) => {
            console.error(e);
        });
        socket.on("disconnect", () => {
        });
        socket.on("sendMessage", (wrapped) => {
            (0, mongo_1.sendMessage)(wrapped.data)
                .then((data) => {
                console.log(`sendMessage in mongo db worked: ${data}`);
                socket.emit("messageConfirmation", wrapped.data);
                io.sockets.emit("newMessage", { message: wrapped.data });
            })
                .catch((e) => {
                console.error(e);
            });
        });
    });
}
exports.default = handleSocket;
