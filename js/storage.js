const KEY = "carrito";

export const guardarCarritoStorage = (carrito) => {
  localStorage.setItem(KEY, JSON.stringify(carrito)); //convertir a json y guardar
};

export const obtenerCarritoStorage = () => {
  return JSON.parse(localStorage.getItem(KEY)) || []; //trasformar de json a objeto
};

export const vaciarCarritoStorage = () => {
  localStorage.removeItem(KEY);
};
