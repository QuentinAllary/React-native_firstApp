const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 23456 });

// This code generates unique userid for everyuser.
const getUniqueID = () => {
  const s4 = () =>
    Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  return s4() + s4() + "-" + s4();
};

wss.on("connection", ws => {
  console.log("Connected");
  ws.on("message", message => {
    console.log(`Received message => ${message}`);
    wss.clients.forEach(function each(client) {
      client.send(message);
    });
  });
});
