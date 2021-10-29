const http = require("http");
const express = require("express");
const WebSocket = require("ws");

const app = express();

const server = http.createServer(app);

const PORT = process.env.port || 5000;
const webSocketServer = new WebSocket.Server({ server });

webSocketServer.on("connection", (ws) => {
  console.log("подключение установлено!");
  ws.on("message", (msg) => {
    const message = JSON.parse(msg);
    //ws.send("wtf");
    console.log("MSG___", message);
    switch (message.type) {
      case "CONNECTED":
        connectionHandler(ws, message);
        //broadcastToRoom(ws.clientId, ws.roomId, message);
        break;
      case "PLAYER_MOVE":
        console.log("message res", message);
        broadcastToRoom(ws.clientId, ws.roomId, message);
        break;
    }
  });

  //   ws.on("error", (e) => ws.send(e));
});

connectionHandler = (ws, msg) => {
  ws.clientId = msg.payload.clientId;
  ws.roomId = msg.payload.roomId;

  console.log(" ws.clientI", ws.clientId, msg);

  // console.log("clients", webSocketServer.clients);
  // if (msg.roomId === roomId && client.clientId !== clientId) {
  webSocketServer.clients.forEach((client) => {
    client.send(JSON.stringify(msg));
    console.log("send", ws.clientId, ws.roomId);
  });
};

broadcastToRoom = (clientId, roomId, msg) => {
  webSocketServer.clients.forEach((client) => {
    console.log("room", client.roomId, roomId, client.roomId === roomId);
    console.log(
      "client",
      client.clientId,
      clientId,
      client.clientId !== clientId
    );
    if (client.roomId === roomId && client.clientId !== clientId) {
      client.send(JSON.stringify(msg));
      client.send(JSON.stringify({ moveAvailable: true }));
    }
  });
};

server.listen(PORT, () => console.log(`server is runing on PORT ${PORT}`));
