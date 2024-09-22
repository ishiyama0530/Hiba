import type { MiddlewareHandler } from "../hiba/types";

declare module "../hiba/context" {
  interface Context {
    user: {
      name: string;
    };
  }
}

export const auth: MiddlewareHandler = async (c, next) => {
  const bearer = c.req.headers.get("Authorization");
  if (!bearer) {
    return new Response("Unauthorized", { status: 401 });
  }

  const token = bearer.replace("Bearer ", "");
  if (token !== "123") {
    return new Response("Unauthorized", { status: 401 });
  }

  c.user = { name: "Hibana-kun" };

  return await next();
};
