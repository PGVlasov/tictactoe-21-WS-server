const http = require("http");
const express = require("express");
const WebSocket = require("ws");

const app = express();

const server = http.createServer(app);

const PORT = process.env.port || 5000;
const webSocketServer = new WebSocket.Server({ server });

// const rooms = new Set();

webSocketServer.on("connection", (ws, req) => {
  console.log("подключение установлено!");

  ws.on("message", (msg) => {
    msg = JSON.parse(msg);
    console.log("MSG___", msg);
    switch (msg.method) {
      case "connection":
        connectionHandler(ws, msg);
        break;
      case "move":
        broadcastConnection(ws, msg);
        break;
    }
  });

  //   ws.on("error", (e) => ws.send(e));
  ws.client;
  ws.send("Hi there, I am a WebSocket server");
});

connectionHandler = (ws, msg) => {
  ws.id = msg.id;
  //   broadcastConnection(ws, msg);
};

// sendToRoom(roomId) {

// }

broadcastConnection = (ws, msg) => {
  console.log(msg);
  webSocketServer.clients.forEach((client) => {
    if (client.id === msg.id) {
      client.send(JSON.stringify(msg));
    }
  });
};

server.listen(PORT, () => console.log(`server is runing on PORT ${PORT}`));
