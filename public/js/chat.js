const socket = io();

const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});

document.querySelector("#message-form").addEventListener("submit", (e) => {
  e.preventDefault();

  const message = e.target.elements.message.value;
  socket.emit("sendMessage", message);
});

socket.on("message", (data) => console.log(data));

socket.on("roomData", ({ room, users }) => {
  document.getElementById("chat-id").innerText = `${room} chat room`;
  const usersList = document.getElementById("users-list");
  users.forEach((user) => {
    const listItem = document.createElement("li");
    listItem.innerText = user.username;
    usersList.appendChild(listItem);
  });
});

socket.emit("join", { username, room }, (error) => {
  if (error) {
    alert(error);
    location.href = "/";
  }
});
