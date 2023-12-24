import express, { Express, Request, Response } from "express";
import handleSocket from "./socket";
import { gatherAllUsers } from "./mongo";

const PORT = process.env.PORT || "3000";
const app: Express = express();
const http = require("http").Server(app);
const cors = require("cors");

app.use(cors());
app.use(express.static("./static"));

// Socket.io
handleSocket(http);

// At the start of the server, get all users
gatherAllUsers();

app.get("/test", (req: Request, res: Response) => {
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
