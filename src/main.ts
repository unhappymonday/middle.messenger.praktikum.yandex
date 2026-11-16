import { registerPartial } from "@/helpers/registerPartial";
import { registerHelpers } from "@/helpers/registerHelpers";
import App from "./App";
import "./styles/style.scss";
import { Block } from "@/shared/Components/Block/Block";

export class Button extends Block {
  protected template: string = `<button>{{label}}</button>`;
  protected events = { click: () => console.log("клик") };
  protected componentDidMount() {
    console.log("mounted");
  }
  protected componentWillUnmount() {
    console.log("unmounting");
  }
}

const btn = new Button({ label: "HI" });
document.body.append(btn.element()!);

setTimeout(() => btn.setProps({ label: "BYE" }), 2000);

registerPartial();
registerHelpers();

document.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById("app");
  if (!root) throw new Error("Элемент #app не найден");

  new App(root).render();
});
