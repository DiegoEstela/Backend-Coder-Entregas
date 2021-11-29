const socket = io();

// Formulario Productos

socket.on("back", (data) => {
  render(data);
});

const render = (data) => {
  let html = data
    .map((x) => {
      return `   
      <tr>
          <td>${x.nombre}</td>   
          <td>${x.precio}</td>
          <td>${x.descripcion}</td>
          <td>
            <img
              src="${x.foto}"
              alt="${x.foto}"
              class="img-thumbnail"
            />
          </td>
        </tr>`;
    })
    .join("");

  document.querySelector("#tbody").innerHTML = html;
};

const addInfo = () => {
  let dataObj = {
    nombre: document.querySelector("#nombre").value,
    descripcion: document.querySelector("#descripcion").value,
    precio: document.querySelector("#precio").value,
    foto: document.querySelector("#foto").value,
  };
  socket.emit("dataObj", dataObj);
  document.querySelector("#nombre").value = "";
  document.querySelector("#descripcion").value = "";
  document.querySelector("#precio").value = "";
  document.querySelector("#foto").value = "";

  return false;
};

// Chat

socket.on("backMensaje", (dataMens) => {
  renderMens(dataMens);
});

const renderMens = (data) => {
  let html = data
    .map((x) => {
      return ` <p ><strong class="text-primary">${x.nombre}</strong><span class=" text-danger"> ${x.fecha}</span>: <span class="fst-italic text-success"> ${x.mensaje}</span> </p>`;
    })
    .join(" ");

  document.querySelector("#mensajes").innerHTML = html;
};

const addMenssage = () => {
  let dataObj = {
    nombre: document.querySelector("#name").value,
    mensaje: document.querySelector("#mensaje").value,
  };

  socket.emit("dataMensaje", dataObj);

  document.querySelector("#mensaje").value = "";
  return false;
};
