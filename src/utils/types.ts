export type Indexed<T = unknown> = { [key in string]: T };

export type StringIndexed = Record<string, unknown>;
