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
    const message = JSON.parse(msg);
    console.log("MSG___", message);
    switch (message.type) {
      case "CONNECTED":
        connectionHandler(ws, message.payload);
        break;
      case "PLAYER_MOVE":
        broadcastToRoom(ws.id, message);
        break;
    }
  });

  //   ws.on("error", (e) => ws.send(e));

  ws.send("Hi there, I am a WebSocket server");
});

connectionHandler = (ws, msg) => {
  ws.clientId = msg.clientId;
  ws.roomId = msg.roomId;
  //   console.log("WS____ID", ws.id);
  //   broadcastToRoom(ws, msg);
};

// sendToRoom(roomId) {

// }

broadcastToRoom = (clientId, roomId, msg) => {
  console.log(`sending to room ${roomId}, message: ${msg}`);
  webSocketServer.clients.forEach((client) => {
    console.log(`client_id: ${client.id}, roomId: ${roomId}`);
    if (client.roomId === roomId && client.clientId !== clientId) {
      console.log("____sending ---", msg);
      client.send(JSON.stringify(msg));
    }
  });
};

server.listen(PORT, () => console.log(`server is runing on PORT ${PORT}`));
