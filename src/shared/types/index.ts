import type {
  IBlockComponent,
  TBlockProps,
} from "@/shared/Components/Block/types";

export interface IComponentClass<P extends TBlockProps = TBlockProps> {
  componentName: string;
  new (props: P): IBlockComponent;
}
