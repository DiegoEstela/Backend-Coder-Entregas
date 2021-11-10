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
      <td>${x.title}</td>
      <td>${x.price}</td>
      <td><img src="${x.thumbnail}" alt="${x.title} " width="60"></td>
      </tr>
    `;
    })
    .join("");

  document.querySelector("#tbody").innerHTML = html;
};

const addInfo = () => {
  let dataObj = {
    title: document.querySelector("#title").value,
    price: document.querySelector("#price").value,
    thumbnail: document.querySelector("#thumbnail").value,
  };
  socket.emit("dataObj", dataObj);

  document.querySelector("#title").value = "";
  document.querySelector("#price").value = "";
  document.querySelector("#thumbnail").value = "";

  return false;
};

// Chat

const Mail = prompt("Ingrese su Email");
document.querySelector("#Email").value = Mail;

socket.on("backMensaje", (dataMens) => {
  renderMens(dataMens);
});

const renderMens = (data) => {
  let html = data
    .map((x) => {
      return ` <p ><strong class="text-primary">${x.email}</strong><span class=" text-danger"> ${x.fecha}</span>: <span class="fst-italic text-success"> ${x.msn}</span> </p>`;
    })
    .join(" ");

  document.querySelector("#caja").innerHTML = html;
};

const addMenssage = () => {
  const fecha = new Date();
  const fechaActual = `${fecha.getDate()}/${fecha.getMonth()}/${fecha.getFullYear()} ${fecha.getHours()}:${fecha.getMinutes()} `;
  let dataMen = {
    email: Mail,
    msn: document.querySelector("#msn").value,
    fecha: fechaActual,
  };

  socket.emit("dataMensaje", dataMen);
  document.querySelector("#Email").value = Mail;
  document.querySelector("#msn").value = "";
  return false;
};
