import { registerPartial } from "@/helpers/registerPartial";
import { registerHelpers } from "@/helpers/registerHelpers";
import App from "./App";
import "./styles/style.scss";

registerPartial();
registerHelpers();

document.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById("app");
  if (!root) throw new Error("Элемент #app не найден");

  new App(root).render();
});
