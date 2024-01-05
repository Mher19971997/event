import 'libs/shared/src/util/global/index';
import { NestExpressApplication } from '@nestjs/platform-express';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from 'libs/shared/src/config/config.service';
import { Logger } from 'libs/shared/src/util/logger';
import { AllExceptionsFilter } from 'libs/shared/src/filters/all-exceptions.filter';
import { ValidationPipe } from 'libs/shared/src/pipes/validation.pipe';

export const server = async (app: NestExpressApplication, mod: any, confPref: string) => {
    const configs = app.get(ConfigService);
    
    global.Configs = configs;
    const appConf = configs.get<any>(confPref);
    const logger = new Logger(mod.name);

    app.useLogger([configs.get<any>('app.logging')]);
    app.useGlobalPipes(new ValidationPipe(logger));
    app.useGlobalFilters(new AllExceptionsFilter());
    app.setGlobalPrefix(`${appConf.endpoint}/${appConf.version}`);
    app.enableCors({ origin: '*' });
    app.useStaticAssets('static');
  
    await app.listen(Number(appConf.http.port), appConf.http.host);
    logger.log(`Application is running on: ${await app.getUrl()}`);
  };
  

export const startApp = async (mod: any, confPref: string) => {
  const logger = new Logger(mod.name);
  const app = await NestFactory.create<NestExpressApplication>(mod, { logger });

  await server(app, mod, confPref);
};
  