import type { MiddlewareHandler } from "../hiba/types";

declare module "../hiba/context" {
  interface Context {
    container: {
      get<T>(key: string): T;
    };
  }
}

export const di =
  (container: Map<string, unknown>): MiddlewareHandler =>
  async (c, next) => {
    c.container = {
      get<T>(key: string): T {
        return container.get(key) as T;
      },
    };
    return await next();
  };
