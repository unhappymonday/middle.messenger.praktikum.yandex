import type { TEventList, TProps } from "@/shared/Components/Block/types";
import Handlebars from "handlebars";

export abstract class Block {
  protected abstract template: string;

  protected props: TProps = {} as TProps;

  private domElement: Element | null = null;

  protected events: TEventList = {};

  constructor(props: TProps = {} as TProps) {
    this.props = props;
  }

  protected componentDidMount() {}
  protected componentWillUnmount() {}

  private attachListeners() {
    const element = this.domElement;
    if (!element) return;
    const events = Object.entries(this.events);

    events.forEach(([event, callback]) => {
      if (callback) {
        element.addEventListener(event, callback);
      }
    });
  }

  private removeListeners() {
    const element = this.domElement;
    if (!element) return;
    const events = Object.entries(this.events);

    events.forEach(([event, callback]) => {
      if (callback) {
        element.removeEventListener(event, callback);
      }
    });
  }

  public element() {
    if (!this.domElement) {
      this.render();
    }
    return this.domElement;
  }

  public setProps(newProps: Partial<TProps>) {
    this.props = { ...this.props, ...newProps };
    this.render();
  }

  protected render() {
    const oldElement = this.domElement;
    const newElement = this.compile();

    if (oldElement) {
      this.removeListeners();
      this.componentWillUnmount();
    }

    if (oldElement && newElement) {
      oldElement.replaceWith(newElement);
    }

    this.domElement = newElement;
    this.attachListeners();
    this.componentDidMount();
  }

  private compile(): Element | null {
    const html = Handlebars.compile(this.template)(this.props);
    const templateElement = document.createElement("template");
    templateElement.innerHTML = html;
    return templateElement.content.firstElementChild;
  }
}
