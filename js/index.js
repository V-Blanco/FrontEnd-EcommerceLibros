//cada archivo js tiene una funcionalidad especifica. No es necesario, es solo para claridad.
import {
  agregarAlCarrito,
  actualizarContadorCarrito,
} from "./funcionesCarrito.js";
import { obtenerCarritoStorage } from "./storage.js";

const renderizarProductos = () => {
  //agarramos el div que contiene a las tajetas
  const contenedorTarjetas = document.getElementById("contenedor-tarjetas");

  fetch("./data/productos.json")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((producto) => {
        //armamos las tarjetas
        const tarjeta = document.createElement("article");
        tarjeta.classList.add("card"); //clases para el css

        const img = document.createElement("img");
        img.src = `./${producto.img}`; //prod.img tiene direc generica, hay que ´personalizarla' con la barra
        img.alt = producto.titulo;
        const titulo = document.createElement("h3");
        titulo.textContent = producto.titulo;
        const subtitulo = document.createElement("p");
        subtitulo.textContent = producto.subtitulo;
        const precio = document.createElement("p");
        precio.textContent = `$${producto.precio}`;

        const button = document.createElement("button");
        button.classList.add("btn");
        button.textContent = "Agregar al carrito";
        button.addEventListener("click", () => {
          agregarAlCarrito(producto);
        });

        //agregamos los elementos a la tarjeta, armar la estructura, la "juntamos"
        tarjeta.appendChild(img);
        tarjeta.appendChild(titulo);
        tarjeta.appendChild(subtitulo);
        tarjeta.appendChild(precio);
        tarjeta.appendChild(button);

        //agregamos la tarjeta al contenedor, la agregamos al DOM
        contenedorTarjetas.appendChild(tarjeta);
      });
    })
    .catch((error) => console.log(error));
};

//evitar acceder con el codigo de js a una parte del html que todavia no se cargo
//esperar a que el html se cree y se cargue para que no accedamos a elementos que todavia no existen y tire error
document.addEventListener("DOMContentLoaded", () => {
  const carrito = obtenerCarritoStorage();
  actualizarContadorCarrito(carrito);
  renderizarProductos();
});
