import { HttpError, InternalServerError, NotFoundError } from "./errors";
import { Hiba } from "./hiba/hiba";
import { PoorRouter } from "./hiba/router/poor-router";
import type { Router } from "./hiba/types";
import { auth } from "./middlewares/auth";
import { customHeader } from "./middlewares/custom-header";
import { di } from "./middlewares/di";
import { MyPiyo, type Piyo } from "./piyo";

const router: Router = new PoorRouter();
const app = new Hiba(router);

app.use(auth);
app.use(customHeader("x-hello", "hello world"));

export const container = new Map<string, unknown>();
container.set("piyo", new MyPiyo());
app.use(di(container));

app.get("/hello", async (c) => {
  return c.json({ hello: `world from ${c.env.ENVIRONMENT}` });
});

app.post("/hello", async (c) => {
  return c.json(
    { hello: `world from ${c.env.ENVIRONMENT}` },
    {
      status: 201,
    },
  );
});

app.get("/di", async (c) => {
  const interactor = c.container.get<Piyo>("piyo");
  const data = interactor.handle(c.user.name);
  return c.text(data);
});

app.get("/notfound", () => {
  throw new NotFoundError();
});

app.get("/error", () => {
  throw new InternalServerError();
});

app.onError((err, c) => {
  if (err instanceof HttpError) {
    return c.text(err.message, { status: err.status });
  }

  return c.text("Error", { status: 500 });
});

export default app satisfies ExportedHandler<Env>;
