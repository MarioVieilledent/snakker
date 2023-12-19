"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const PORT = process.env.PORT || "3000";
const app = (0, express_1.default)();
const http = require("http").Server(app);
const cors = require("cors");
const io = require("socket.io")(http, {
    cors: {
        origin: "http://localhost:5173",
    },
});
app.use(cors());
app.use(express_1.default.static("./static"));
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
app.get("/test", (req, res) => {
    res.send("It works!");
});
app.get("/api", (req, res) => {
    res.json({
        message: "Hello world",
    });
});
http.listen(PORT, () => {
    console.log(`App deployed on http://localhost:${PORT}`);
});
