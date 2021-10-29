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
        connectionHandler(ws, message.payload, message, ws.clientId, ws.roomId);
        //broadcastToRoom(ws.clientId, ws.roomId, message);
        break;
      //   case "READYTOPLAY":
      //     readyToPlay(ws, message.payload, message, msg.myIdToEnemyId);
      //     break;
      case "PLAYER_MOVE":
        broadcastToRoom(ws.clientId, ws.roomId, message);
        break;
    }
  });

  //   ws.on("error", (e) => ws.send(e));
});

connectionHandler = (ws, msg, clientId, roomId) => {
  ws.clientId = msg.clientId;
  ws.roomId = msg.roomId;
  ws.send(`{"test": 1}`);
  console.log("clients", webSocketServer.clients);
  webSocketServer.clients.forEach((client) => {
    client.send(JSON.stringify(msg));
    console.log("send");
  });
};

readyToPlay = (ws, msg, clientId, roomId) => {
  //   console.log("сюда приходит все ок");
  //   console.log("WS__CLIENT__ID", ws.clientId);
  //   console.log("WS__ROOM__ID", ws.roomId);
  console.log("сюда что то пришло", msg);
  //   webSocketServer.clients.forEach((client) => {
  //     client.send(JSON.stringify(msg));
  //     console.log("semded", msg);
  //   });
};

broadcastToRoom = (clientId, roomId, msg) => {
  webSocketServer.clients.forEach((client) => {
    if (client.roomId === roomId && client.clientId !== clientId) {
      client.send(JSON.stringify(msg));
      client.send(JSON.stringify({ moveAvaible: true }));
    }
  });
};

server.listen(PORT, () => console.log(`server is runing on PORT ${PORT}`));
