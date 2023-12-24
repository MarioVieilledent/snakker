"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const socket_1 = __importDefault(require("./socket"));
const mongo_1 = require("./mongo");
const PORT = process.env.PORT || "3000";
const app = (0, express_1.default)();
const http = require("http").Server(app);
const cors = require("cors");
app.use(cors());
app.use(express_1.default.static("./static"));
(0, socket_1.default)(http);
(0, mongo_1.gatherAllUsers)();
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
