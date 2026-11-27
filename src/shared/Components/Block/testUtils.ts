import { vi } from "vitest";
import Block from "./Block";
import type { TBlockProps, TEventList } from "./types";

export interface ITestProps extends TBlockProps {
  title?: string;
  name?: string;
  extra?: string;
}

export interface ITestOptions {
  template?: string;
  events?: TEventList;
}

const DEFAULT_TEMPLATE =
  '<div class="test"><span ref="label">{{title}}</span></div>';

export class TestBlock extends Block<ITestProps> {
  protected template: string;

  public readonly hooks = {
    didMount: vi.fn<() => void>(),
    didUpdate: vi.fn<() => void>(),
    willUnmount: vi.fn<() => void>(),
  };

  constructor(props: ITestProps = {}, options: ITestOptions = {}) {
    super(props);

    this.template = options.template ?? DEFAULT_TEMPLATE;
    this.events = options.events ?? {};
  }

  protected override componentDidMount(): void {
    this.hooks.didMount();
  }

  protected override componentDidUpdate(): void {
    this.hooks.didUpdate();
  }

  protected override componentWillUnmount(): void {
    this.hooks.willUnmount();
  }

  public ref<T extends HTMLElement>(name: string): T {
    return this.getRef<T>(name);
  }
}

export class ChildBlock extends TestBlock {
  static componentName = "TestChild";

  static instances: ChildBlock[] = [];

  constructor(props: ITestProps) {
    super(props, { template: '<div class="child">{{title}}</div>' });

    ChildBlock.instances.push(this);
  }
}

export class WrapperBlock extends TestBlock {
  static componentName = "TestWrapper";

  constructor(props: ITestProps) {
    super(props, {
      template: '<section class="wrapper">{{children}}</section>',
    });
  }
}
