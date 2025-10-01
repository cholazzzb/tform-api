export type API<TResponse> = {
  name: string;
  description: string;
  fn: () => Promise<TResponse>;
};
