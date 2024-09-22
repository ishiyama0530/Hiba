import type { MiddlewareHandler } from "../hiba/types";

export const customHeader =
  (name: string, value: string): MiddlewareHandler =>
  async (_, next) => {
    const resp = await next();
    resp.headers.set(name, value);

    return resp;
  };
