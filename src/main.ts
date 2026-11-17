import { registerPartial } from "@/helpers/registerPartial";
import { registerHelpers } from "@/helpers/registerHelpers";
import App from "./App";
import "./styles/style.scss";

function initApp(): void {
  const root = document.getElementById("app");

  if (!root) {
    throw new Error("Элемент #app не найден");
  }

  registerPartial();
  registerHelpers();

  const app = new App(root);
  app.render();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initApp, { once: true });
} else {
  initApp();
}
