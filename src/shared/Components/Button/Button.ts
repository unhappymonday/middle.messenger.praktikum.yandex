import { Block } from "@/shared/Components/Block/Block";

export class Button extends Block {
  protected template: string = `<button>{{label}}</button>`;
}

const el = new Button({ label: "HELLO" }).compile();
document.body.appendChild(el!);
