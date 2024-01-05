import { startApp } from "libs/service/src";
import { AppModule } from "./app.module";

(async function bootstrap() {
  process.env['app.name'] = 'app-api';
  await startApp(AppModule, 'app-api');
})();
