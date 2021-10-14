// const btn = document.getElementById("btn");

// const socket = new WebSocket("ws://localhost:5000/");

// socket.onopen = () => {
//   socket.send(
//     JSON.stringify({
//       id: 555,
//       method: "connection",
//       userName: "Piter",
//     })
//   );
// };

// socket.onmessage = (event) => {
//   console.log("С сервера пришло сообщение: ", event.data);
// };

// btn.onclick = () => {
//   let message = "привет сервер, я клиент";
//   console.log(message);
//   socket.send(
//     JSON.stringify({
//       message,
//       id: 555,
//       method: "message",
//       userName: "Piter",
//     })
//   );
// };
