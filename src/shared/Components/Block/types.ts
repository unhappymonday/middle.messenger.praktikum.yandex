export type TProps = Record<string, unknown>;

export interface IBlockComponent {
  element(): HTMLElement;
  destroy(): void;
}

export interface IBlockChild {
  component: IBlockComponent;
  placeholderId: string;
  embed(node: DocumentFragment): void;
}

export interface IBlockInternalProps {
  __children?: IBlockChild[];
  __refs?: Record<string, HTMLElement>;
}

export type TBlockProps = TProps & IBlockInternalProps;

export type TEventList = Partial<{
  [K in keyof HTMLElementEventMap]: (event: HTMLElementEventMap[K]) => void;
}>;
