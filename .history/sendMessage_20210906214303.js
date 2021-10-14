const btn = document.getElementById("btn");

const socket = new WebSocket("ws://localhost:5000/");

socket.onopen = () => {
  console.log("подключение было установлено");
};
