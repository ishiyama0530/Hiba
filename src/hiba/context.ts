import type { CfRequest } from "./types";

const defaultInit: ResponseInit = {
  status: 200,
  statusText: "OK",
} as const;

export class Context {
  constructor(
    readonly req: CfRequest,
    readonly env: Env,
  ) {}

  json(
    data: unknown,
    init: {
      status?: number;
      statusText?: string;
      headers?: HeadersInit;
    } = { ...defaultInit, headers: { "Content-Type": "application/json" } },
  ) {
    return new Response(JSON.stringify(data), init);
  }

  text(
    data: string,
    init: {
      status?: number;
      statusText?: string;
      headers?: HeadersInit;
    } = { ...defaultInit, headers: { "Content-Type": "text/plain" } },
  ) {
    return new Response(data, init);
  }
}
