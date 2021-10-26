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
        connectionHandler(ws, message.payload);
        break;
      case "PLAYER_MOVE":
        broadcastToRoom(ws.clientId, ws.roomId, message);
        break;
    }
  });

  //   ws.on("error", (e) => ws.send(e));

  ws.send("Hi there, I am a WebSocket server");
});

connectionHandler = (ws, msg) => {
  ws.clientId = msg.clientId;
  ws.roomId = msg.roomId;
  webSocketServer.clients.forEach(
    (client) => {
      if (client.roomId === roomId) {
        ws.send(JSON.stringify(`${msg.clientId} подключился`));
        console.log("------->>> SENDED");
      }
    }

    //   console.log("WS__CLIENT__ID", ws.clientId);
    //   console.log("WS__ROOM__ID", ws.roomId);
  );
};

broadcastToRoom = (clientId, roomId, msg) => {
  console.log(`sending to room ${roomId}, message: ${msg}`);
  webSocketServer.clients.forEach((client) => {
    //console.log(`client_id: ${clientId}, roomId: ${roomId}`);
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
