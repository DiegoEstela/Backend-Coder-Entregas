const socket = io();

socket.on("back", (data) => {
  render(data);
});

const addInfo = () => {
  let dataObj = {
    title: document.querySelector("#title").value,
    price: document.querySelector("#price").value,
    thumbnail: document.querySelector("#thumbnail").value,
  };
  socket.emit("dataObj", dataObj);
  return false;
};
