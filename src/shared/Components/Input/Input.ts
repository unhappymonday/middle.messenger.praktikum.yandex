import Block from "@/shared/Components/Block/Block";
import type { IInputProps } from "@/shared/Components/Input/types";
import template from "./input.hbs?raw";
import "./input.scss";

export default class Input extends Block<IInputProps> {
  protected template = template;

  public static componentName = "Input";

  constructor(props: IInputProps) {
    super({
      ...props,
      type: props.type ?? "text",
      variant: props.variant ?? "text",
      multiline: props.multiline ?? false,
    });

    this.events = {
      ...(props.events ?? {}),
      input: (event) => {
        props.events?.input?.(event);
        this.autoResize();
      },
    };
  }

  protected override componentDidMount(): void {
    this.scheduleResize();
  }

  protected override componentDidUpdate(): void {
    this.scheduleResize();
  }

  public setProps(props: Partial<IInputProps>): void {
    if (props.events) {
      this.events = {
        ...props.events,
        input: (event) => {
          props.events?.input?.(event);
          this.autoResize();
        },
      };
    }

    super.setProps(props);
  }

  public getValue(): string {
    return this.getRef<HTMLInputElement | HTMLTextAreaElement>("input").value;
  }

  public setValue(value: string): void {
    this.getRef<HTMLInputElement | HTMLTextAreaElement>("input").value = value;
    this.autoResize();
  }

  private scheduleResize(): void {
    if (!this.props.multiline) {
      return;
    }

    requestAnimationFrame(() => this.autoResize());
  }

  private autoResize(): void {
    if (!this.props.multiline) {
      return;
    }

    const field = this.getRef<HTMLTextAreaElement>("input");

    if (!field.isConnected) {
      return;
    }

    field.style.height = "auto";

    const { scrollHeight, offsetHeight, clientHeight } = field;

    if (scrollHeight === 0) {
      field.style.removeProperty("height");
      return;
    }

    field.style.height = `${scrollHeight + (offsetHeight - clientHeight)}px`;
  }
}
