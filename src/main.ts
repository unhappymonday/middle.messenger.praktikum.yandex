import App from "./App";
import "./styles/style.scss";

document.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById("app");
  if (!root) throw new Error("Элемент #app не найден");

  new App(root).render();
});
