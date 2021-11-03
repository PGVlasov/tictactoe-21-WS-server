const http = require("http");
const express = require("express");
const WebSocket = require("ws");

const app = express();

const server = http.createServer(app);

const PORT = process.env.port || 5000;
const webSocketServer = new WebSocket.Server({ server });

webSocketServer.on("connection", (ws) => {
  ws.on("message", (msg) => {
    const message = JSON.parse(msg);
    switch (message.type) {
      case "CONNECTED":
        connectionHandler(ws, message);
        break;
      case "PLAYER_MOVE":
        broadcastToRoom(ws.clientId, ws.roomId, message);
        break;
    }
  });
});

connectionHandler = (ws, msg) => {
  ws.clientId = msg.payload.clientId;
  ws.roomId = msg.payload.roomId;
  webSocketServer.clients.forEach((client) => {
    if (client.roomId === ws.roomId && client.clientId !== ws.clientId) {
      client.send(JSON.stringify(msg));
    }
  });
};

broadcastToRoom = (clientId, roomId, msg) => {
  webSocketServer.clients.forEach((client) => {
    if (client.roomId === roomId && client.clientId !== clientId) {
      client.send(JSON.stringify(msg));
      client.send(JSON.stringify({ moveAvailable: true }));
    }
  });
};

server.listen(PORT, () => console.log(`server is runing on PORT ${PORT}`));
