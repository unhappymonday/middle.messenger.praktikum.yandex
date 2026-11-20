import type {
  IBlockComponent,
  TBlockProps,
  TEventList,
} from "@/shared/Components/Block/types";
import Handlebars from "handlebars";

export default abstract class Block<Props extends TBlockProps = TBlockProps> {
  protected abstract template: string;

  protected props: Props;

  protected children: IBlockComponent[] = [];

  protected refs: Record<string, HTMLElement> = {};

  protected events: TEventList = {};

  private domElement: HTMLElement | null = null;

  private isMounted = false;

  constructor(props: Props) {
    this.props = {
      ...props,
      __children: props.__children ?? [],
      __refs: props.__refs ?? {},
    };
  }

  public element(): HTMLElement {
    if (!this.domElement) {
      this.render();
    }

    if (!this.domElement) {
      throw new Error("Не удалось создать DOM-элемент компонента");
    }

    return this.domElement;
  }

  public setProps(props: Partial<Props>): void {
    this.props = {
      ...this.props,
      ...props,
      __children: [],
      __refs: {},
    };

    this.render();
  }

  protected componentDidMount(): void {}

  protected componentDidUpdate(): void {}

  protected componentWillUnmount(): void {}

  public destroy(): void {
    if (!this.domElement) {
      return;
    }

    this.removeListeners();
    this.destroyChildren();

    this.componentWillUnmount();

    this.domElement = null;
    this.isMounted = false;
  }

  protected render(): void {
    if (this.domElement) {
      this.removeListeners();
      this.destroyChildren();
    }

    const newElement = this.compile();

    if (this.domElement) {
      this.domElement.replaceWith(newElement);
    }

    this.domElement = newElement;

    this.attachListeners();

    if (!this.isMounted) {
      this.isMounted = true;
      this.componentDidMount();
    } else {
      this.componentDidUpdate();
    }
  }

  private compile(): HTMLElement {
    const html = Handlebars.compile(this.template)(this.props);

    const templateElement = document.createElement("template");
    templateElement.innerHTML = html;

    const fragment = templateElement.content;

    if (fragment.childElementCount !== 1) {
      throw new Error(
        "Шаблон компонента должен содержать один корневой элемент",
      );
    }

    const rootElement = fragment.firstElementChild;

    if (!(rootElement instanceof HTMLElement)) {
      throw new Error("Корневой элемент компонента должен быть HTMLElement");
    }

    const children = this.props.__children ?? [];

    this.children = children.map(({ component }) => component);

    children.forEach(({ embed }) => {
      embed(fragment);
    });

    const refs = this.props.__refs ?? {};

    if (rootElement.hasAttribute("ref")) {
      const refName = rootElement.getAttribute("ref");

      if (refName) {
        refs[refName] = rootElement;
      }

      rootElement.removeAttribute("ref");
    }

    fragment.querySelectorAll<HTMLElement>("[ref]").forEach((element) => {
      const refName = element.getAttribute("ref");

      if (refName) {
        refs[refName] = element;
      }

      element.removeAttribute("ref");
    });

    this.refs = refs;

    return rootElement;
  }

  private attachListeners(): void {
    if (!this.domElement) {
      return;
    }

    Object.entries(this.events).forEach(([eventName, callback]) => {
      if (callback) {
        this.domElement?.addEventListener(eventName, callback as EventListener);
      }
    });
  }

  private removeListeners(): void {
    if (!this.domElement) {
      return;
    }

    Object.entries(this.events).forEach(([eventName, callback]) => {
      if (callback) {
        this.domElement?.removeEventListener(
          eventName,
          callback as EventListener,
        );
      }
    });
  }

  private destroyChildren(): void {
    [...this.children].reverse().forEach((child) => {
      child.destroy();
    });

    this.children = [];
  }

  protected getRef<T extends HTMLElement>(name: string): T {
    const element = this.refs[name];

    if (!element) {
      throw new Error(`Не найден ref: ${name}`);
    }

    return element as T;
  }
}
