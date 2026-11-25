import type { TListener } from "@/services/store/types";
import set from "@/utils/set";
import type { Indexed } from "@/utils/types";

class Store {
  private state: Indexed = {
    user: null,
    chats: [],
    activeChatId: null,
    activeChatUsers: [],
  };

  private readonly listeners = new Set<TListener>();

  public getState(): Indexed {
    return this.state;
  }

  public setState(path: string, value: unknown): void {
    this.state = set(this.state, path, value);
    this.emit();
  }

  public subscribe(listener: TListener): () => void {
    this.listeners.add(listener);

    return () => {
      this.listeners.delete(listener);
    };
  }

  private emit(): void {
    this.listeners.forEach((listener) => listener());
  }
}

export default new Store();
