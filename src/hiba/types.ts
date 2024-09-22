import type { Context } from "./context";

export type CfHandler = Parameters<
  Exclude<ExportedHandler<Env>["fetch"], undefined>
>;

export type CfRequest = Request<unknown, IncomingRequestCfProperties<unknown>>;
export type Result = Promise<Response>;
export type RouteHandler = (c: Context) => Result;
export type MiddlewareHandler = (c: Context, next: () => Result) => Result;

export type Router = {
  readonly name: string;
  add(method: string, path: string, handler: RouteHandler): void;
  match(method: string, path: string): RouteHandler | null;
};

export type ErrorHandler = (err: unknown, c: Context) => Response;
