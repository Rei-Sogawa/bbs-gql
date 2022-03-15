export type Exact<T, R> = T extends R ? (R extends T ? T : never) : never;
