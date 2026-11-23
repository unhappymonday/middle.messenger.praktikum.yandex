import { registerHelpers } from "@/shared/helpers/registerHelpers";
import App from "./App";
import "./styles/style.scss";
import registerComponents from "@/app/registerAll";
import { registerIcons } from "@/shared/helpers/registerIcons";
import AuthController from "@/services/controllers/AuthController";

async function initApp(): Promise<void> {
  if (!document.getElementById("app")) {
    throw new Error("Элемент #app не найден");
  }

  registerIcons();
  registerHelpers();
  registerComponents();

  await AuthController.fetchUser();

  new App("#app").start();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => void initApp(), {
    once: true,
  });
} else {
  void initApp();
}
