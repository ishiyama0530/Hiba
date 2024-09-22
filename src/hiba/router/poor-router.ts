import type { RouteHandler, Router } from "../types";

export class PoorRouter implements Router {
  readonly name = "PoorRouter";

  private readonly routes: Map<string, RouteHandler> = new Map();

  add(method: string, path: string, handler: RouteHandler): void {
    const key = this.generateKey(method, path);
    this.routes.set(key, handler);

    console.dir(this.routes);
  }

  match(method: string, path: string): RouteHandler | null {
    const key = this.generateKey(method, path);
    return this.routes.get(key) || null;
  }

  private generateKey(method: string, path: string): string {
    return `${method}:${path}`;
  }
}
