import type { IConnectable } from "@/services/store/types";
import type { TBlockProps } from "@/shared/Components/Block/types";
import isEqual from "@/utils/isEqual";
import type { Indexed } from "@/utils/types";
import store from "@/services/store/Store";

export function connect<S extends Indexed>(
  mapStateToProps: (state: Indexed) => S,
) {
  return function <P extends TBlockProps>(
    Component: new (props: P) => IConnectable<P>,
  ) {
    return class ConnectedBlock extends Component {
      private readonly unsubscribe: () => void;

      constructor(props: P) {
        let state = mapStateToProps(store.getState());

        super({ ...props, ...state });

        this.unsubscribe = store.subscribe(() => {
          const newState = mapStateToProps(store.getState());

          if (!isEqual(state, newState)) {
            this.setProps(newState as unknown as Partial<P>);
          }

          state = newState;
        });
      }

      public override destroy(): void {
        this.unsubscribe();
        super.destroy();
      }
    };
  };
}
