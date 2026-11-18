import { registerHelpers } from "@/shared/helpers/registerHelpers";
import App from "./App";
import "./styles/style.scss";
import registerComponents from "@/app/registerAll";
import { registerIcons } from "@/shared/helpers/registerIcons";

function initApp(): void {
  const root = document.getElementById("app");

  if (!root) {
    throw new Error("Элемент #app не найден");
  }

  registerIcons();
  registerHelpers();
  registerComponents();

  const app = new App(root);
  app.render();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initApp, { once: true });
} else {
  initApp();
}
