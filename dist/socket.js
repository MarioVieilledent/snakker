"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongo_1 = require("./mongo");
const access_1 = require("./access");
const NumberOfMessageswLoadedOnConnection = 100;
function handleSocket(http) {
    const io = require("socket.io")(http, {
        cors: {
            origin: "http://localhost:5173",
        },
    });
    io.on("connection", (socket) => {
        socket.on("disconnect", () => {
        });
        socket.on("tryToConnect", (wrapped) => {
            if (wrapped.data.password === access_1.appPassword) {
                (0, mongo_1.getLastNDocuments)(NumberOfMessageswLoadedOnConnection)
                    .then((messages) => {
                    socket.emit("connectionOk", { messages, token: access_1.appToken });
                })
                    .catch((e) => {
                    console.error(e);
                });
            }
            else {
                socket.emit("connectionFailed", { reason: "Wrong password" });
            }
        });
        socket.on("sendMessage", (wrapped) => {
            if ((0, access_1.auth)(wrapped.token)) {
                (0, mongo_1.sendMessage)(wrapped.data)
                    .then((data) => {
                    console.log(`sendMessage in mongo db worked: ${data}`);
                    socket.emit("messageConfirmation", wrapped.data);
                    io.sockets.emit("newMessage", { message: wrapped.data });
                })
                    .catch((e) => {
                    console.error(e);
                });
            }
            else {
                socket.emit("notAllowed", { reason: "Wrong token" });
            }
        });
    });
}
exports.default = handleSocket;
