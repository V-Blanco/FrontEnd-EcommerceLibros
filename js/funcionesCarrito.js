import {
  obtenerCarritoStorage,
  guardarCarritoStorage,
  vaciarCarritoStorage,
} from "./storage.js";

export const agregarAlCarrito = (producto) => {
  const carrito = obtenerCarritoStorage();
  carrito.push(producto);
  guardarCarritoStorage(carrito); //para guardar en el storage
  actualizarContadorCarrito(carrito);
  mostrarMensaje("Producto agregado");
};

export const eliminarProducto = (indiceProducto) => {
  const carrito = obtenerCarritoStorage();
  carrito.splice(indiceProducto, 1);

  guardarCarritoStorage(carrito); //actulizar cariito
  actualizarContadorCarrito(carrito);
  mostrarMensaje("Producto eliminado");
};

export const vaciarCarrito = () => {
  vaciarCarritoStorage();
  actualizarContadorCarrito([]);
  mostrarMensaje("Carrito vaciado");
};

// ui  funciones que van actualizar cosas que se ven
export const actualizarContadorCarrito = (carrito) => {
  const contador = document.getElementById("contador-carrito");
  if (contador) {
    contador.textContent = carrito.length; // textContent hace que se modifique en el html
  }
};

export const mostrarMensaje = (mensaje) => {
  Swal.fire({
    title: "Aviso",
    text: mensaje,
    icon: "success",
    confirmButtonText: "OK",

    heightAuto: false, //evita que el modal altere la altura del documento. que no se suba el fotter durante el aviso
    scrollbarPadding: false, // evita que se agregue espacio extra cuando se oculta la barra de scroll.
  });
};
