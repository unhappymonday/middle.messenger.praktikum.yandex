import type Block from "@/shared/Components/Block/Block";
import type { TBlockProps } from "@/shared/Components/Block/types";

export interface IComponentClass {
  new (props: TBlockProps): Block<TBlockProps>;
  componentName: string;
}
