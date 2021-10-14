const btn = document.getElementById("btn");

const socket = new WebSocket("ws://localhost:5000/");

socket.onopen = () => {
  console.log("подключение было установлено");
};

socket.onmessage = (event) => {
  console.log("С сервера пришло сообщение: ", event.data);
};

btn.onclick = () => {
  let message = "привет сервер, я клиент";
  console.log(message);
  socket.send(
    JSON.stringify({
      message,
      id: 555,
      userName: "Piter",
    })
  );
};
