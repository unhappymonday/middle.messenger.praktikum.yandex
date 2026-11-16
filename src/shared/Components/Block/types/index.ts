export type TProps = Record<string, unknown>;

export type TEventList = Partial<
  Record<keyof HTMLElementEventMap, (e: Event) => void>
>;
