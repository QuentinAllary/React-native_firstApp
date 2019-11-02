const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 23456 }, console.log("Server starting on port 23456"));

wss.on("connection", ws => {
  console.log("Connected");
  ws.on("message", message => {
    console.log(`Received message => ${message}`);
    wss.clients.forEach(function each(client) {
      client.send(message);
    });
  });
});
