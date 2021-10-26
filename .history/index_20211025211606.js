const http = require("http");
const express = require("express");
const WebSocket = require("ws");

const app = express();

const server = http.createServer(app);

const PORT = process.env.port || 5000;
const webSocketServer = new WebSocket.Server({ server });

webSocketServer.on("connection", (ws, req) => {
  console.log("подключение установлено!");

  ws.on("message", (msg) => {
    const message = JSON.parse(msg);
    console.log("MSG___", message);
    switch (message.type) {
      case "CONNECTED":
        broadcastToRoom(ws.clientId, ws.roomId, message);
        break;
      case "PLAYER_MOVE":
        broadcastToRoom(ws.clientId, ws.roomId, message);
        break;
    }
  });

  //   ws.on("error", (e) => ws.send(e));

  ws.send("Hi there, I am a WebSocket server");
});

connectionHandler = (clientId, roomId, msg) => {};

broadcastToRoom = (clientId, roomId, msg) => {
  console.log(`sending to room ${roomId}, message: ${msg}`);
  webSocketServer.clients.forEach((client) => {
    console.log(`client_id: ${clientId}, roomId: ${roomId}`);
    if (client.roomId === roomId && client.clientId !== clientId) {
      //   console.log("____sending --- to one client", msg);
      //   console.log("client.clientId", client.clientId);
      //   console.log("clientId", clientId);
      //   console.log("client.roomId", client.roomId);
      //   console.log("roomId", roomId);
      client.send(JSON.stringify(msg));
      client.send(JSON.stringify({ moveAvaible: true }));
    }
  });
};

server.listen(PORT, () => console.log(`server is runing on PORT ${PORT}`));
