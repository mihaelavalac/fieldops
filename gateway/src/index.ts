import { createApp } from "./app";
import { env } from "./config";

const app = createApp();
app.listen(Number(env.PORT), () => {
  console.log(`Gateway listening on http://localhost:${env.PORT}`);
});
