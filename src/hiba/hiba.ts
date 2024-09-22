import { Context } from "./context";
import { PoorRouter } from "./router/poor-router";
import type {
  CfRequest,
  ErrorHandler,
  MiddlewareHandler,
  Result,
  RouteHandler,
  Router,
} from "./types";

const defaultErrorHandler: ErrorHandler = (err: unknown, c: Context) => {
  return new Response("Error", { status: 500 });
};

const execute = (
  index: number,
  c: Context,
  middlewares: MiddlewareHandler[],
  routeHandler: RouteHandler,
): Result => {
  if (index === middlewares.length) {
    return routeHandler(c);
  }

  const current = middlewares[index];
  const next = () => execute(index + 1, c, middlewares, routeHandler);

  return current(c, next);
};

export class Hiba {
  private readonly router: Router;
  private handleError: ErrorHandler;
  private readonly middlewares: MiddlewareHandler[];

  constructor(router: Router = new PoorRouter()) {
    this.router = router;
    this.handleError = defaultErrorHandler;
    this.middlewares = [];
  }

  onError(handler: ErrorHandler) {
    this.handleError = handler;
  }

  get(path: string, handler: (c: Context) => Promise<Response> | Response) {
    this.router.add("GET", path, handler);
  }

  post(path: string, handler: (c: Context) => Promise<Response> | Response) {
    this.router.add("POST", path, handler);
  }

  use(handler: MiddlewareHandler) {
    this.middlewares.push(handler);
  }

  fetch: (request: CfRequest, env: Env, _: ExecutionContext) => Result = (
    request,
    env,
  ) => {
    const path = new URL(request.url).pathname;
    const routeHandler = this.router.match(request.method, path);
    if (!routeHandler) {
      return new Response("Not Found", { status: 404 });
    }

    const c = new Context(request, env);
    try {
      return execute(0, c, this.middlewares, routeHandler);
    } catch (e) {
      return this.handleError(e, c);
    }
  };
}
