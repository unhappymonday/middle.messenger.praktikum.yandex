import type { TChatDTO, TChatUserDTO } from "@/services/api/Chats/types";
import type { TUserDTO } from "@/services/api/Users/types";
import type {
  IBlockComponent,
  TBlockProps,
} from "@/shared/Components/Block/types";

export type TListener = () => void;

export interface IConnectable<P extends TBlockProps> extends IBlockComponent {
  setProps(props: Partial<P>): void;
}

export type TStoreState = {
  user: TUserDTO | null;
  chats: TChatDTO[];
  activeChatId: number | null;
  activeChatUsers: TChatUserDTO[];
};
