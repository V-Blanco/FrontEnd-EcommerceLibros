import { obtenerCarritoStorage } from "./storage.js";
import { actualizarContadorCarrito } from "./funcionesCarrito.js";

document.addEventListener("DOMContentLoaded", () => {
  const carrito = obtenerCarritoStorage();
  actualizarContadorCarrito(carrito);
});
