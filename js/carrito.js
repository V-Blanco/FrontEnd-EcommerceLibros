import { obtenerCarritoStorage, vaciarCarritoStorage } from "./storage.js";
import {
  eliminarProducto,
  actualizarContadorCarrito,
} from "./funcionesCarrito.js";

const renderizarCarrito = () => {
  const carrito = obtenerCarritoStorage();
  actualizarContadorCarrito(carrito);

  const contenedorCarrito = document.getElementById("contenedor-carrito");
  const divAcciones = document.getElementById("acciones-carrito"); //botones

  contenedorCarrito.innerHTML = ""; //limpiar el contenedor
  divAcciones.innerHTML = "";

  if (!carrito.length) {
    const mensaje = document.createElement("p");
    mensaje.classList.add("mensaje-carrito-vacio");
    mensaje.textContent = "El carrito esta vacio";
    contenedorCarrito.appendChild(mensaje);
    return;
  }

  //forEach((producto,index) -> index parametro opcional del forEahc,para el indice del elemento
  carrito.forEach((producto, index) => {
    const tarjeta = document.createElement("article");
    tarjeta.classList.add("card");
    const img = document.createElement("img");
    img.src = `../${producto.img}`;
    img.alt = producto.titulo;
    const titulo = document.createElement("h3");
    titulo.textContent = producto.titulo;
    const subtitulo = document.createElement("p");
    subtitulo.textContent = producto.subtitulo;
    const precio = document.createElement("p");
    precio.textContent = `$${producto.precio}`;

    const btnEliminar = document.createElement("button");
    btnEliminar.classList.add("btn", "btn-eliminar-carrito");
    btnEliminar.textContent = "Eliminar producto";

    btnEliminar.addEventListener("click", () => {
      eliminarProducto(index);
      renderizarCarrito(); //para que cambie en la pagina, sino se elimina del storage pero sigue apareciendo en la web
    });

    tarjeta.appendChild(img);
    tarjeta.appendChild(titulo);
    tarjeta.appendChild(subtitulo);
    tarjeta.appendChild(precio);
    tarjeta.appendChild(btnEliminar);

    contenedorCarrito.appendChild(tarjeta);
  });

  const total = carrito.reduce((acumulador, producto) => {
    return acumulador + producto.precio;
  }, 0);
  const totalPrecio = document.createElement("p");
  totalPrecio.classList.add("total-carrito");
  totalPrecio.textContent = `Total a pagar: $${total}`;
  divAcciones.appendChild(totalPrecio);

  const btnVaciar = document.createElement("button");
  btnVaciar.classList.add("btn", "btn-vaciar-carrito");
  btnVaciar.textContent = "Vaciar carrito";
  btnVaciar.addEventListener("click", () => {
    vaciarCarritoStorage();
    renderizarCarrito();
  });
  divAcciones.appendChild(btnVaciar);
};

document.addEventListener("DOMContentLoaded", () => {
  renderizarCarrito();
});
