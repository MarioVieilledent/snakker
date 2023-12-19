import express, { Express, Request, Response } from "express";

const PORT = process.env.PORT || '3000';
const app: Express = express();
const http = require('http').Server(app);
const cors = require('cors');
const io = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:5173"
    }
});

app.use(cors());
app.use(express.static('./client/dist'));

io.on('connection', (socket: any) => {
    console.log(`⚡: ${socket.id} user just connected!`);
    socket.on('disconnect', () => {
        console.log('🔥: A user disconnected');
    });

    socket.on('test', (message: string) => console.log(message));
});

app.get("/test", (req: Request, res: Response) => {
    res.send("It works!");
});

app.get('/api', (req, res) => {
    res.json({
        message: 'Hello world',
    });
});

http.listen(PORT, () => {
    console.log(`App deployed on http://localhost:${PORT}`);
});