import type { TBlockFactory, TRouteAccess } from "@/services/router/types";
import type { IBlockComponent } from "@/shared/Components/Block/types";

export default class Route {
  private block: IBlockComponent | null = null;

  constructor(
    private readonly pathname: string,
    private readonly createBlock: TBlockFactory,
    private readonly rootQuery: string,
    public readonly access: TRouteAccess = "public",
  ) {}

  public match(pathname: string): boolean {
    return this.pathname === pathname;
  }

  public render(): void {
    const root = this.getRoot();
    const block = this.createBlock();

    root.replaceChildren(block.element());
    this.block = block;
  }

  public leave(): void {
    this.block?.destroy();
    this.block = null;
    this.getRoot().replaceChildren();
  }

  private getRoot(): HTMLElement {
    const root = document.querySelector<HTMLElement>(this.rootQuery);

    if (!root) {
      throw new Error(`Root element not found: ${this.rootQuery}`);
    }

    return root;
  }
}
