export interface Action<T> {
  type: string | symbol;
  payload?: T;
  error?: boolean;
}
