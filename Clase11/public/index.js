const socket = io();

socket.on("back", (data) => {
  render(data);
});

const render = (data) => {
  console.log("desde el render", data);
  let html = data
    .map((x) => {
      return `  <p> <strong>${x.title}</strong> : ${x.price} </p>`;
    })
    .join("");

  document.querySelector("#caja").innerHTML = html;
};

const addInfo = () => {
  let dataObj = {
    title: document.querySelector("#title").value,
    price: document.querySelector("#price").value,
    thumbnail: document.querySelector("#thumbnail").value,
  };
  socket.emit("dataObj", dataObj);
  return false;
};
