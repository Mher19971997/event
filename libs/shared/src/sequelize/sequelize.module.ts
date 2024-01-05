import {  LogLevel, Module } from '@nestjs/common';
import { SequelizeModule as BaseSequelizeModule, SequelizeModuleOptions } from '@nestjs/sequelize';
import { Logger } from '../util/logger';
import { ConfigService } from '../config/config.service';

@Module({
  imports: [
    BaseSequelizeModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService): SequelizeModuleOptions => {
        const { url, ...options } = configService.get<any>('db.postgres');
        
        if (!options) {
          return {};
        }
        const dbUrl = new URL(url);
        const logger = new Logger(SequelizeModule.name);

        return {
          timezone: 'UTC',
          host: dbUrl.hostname,
          port: Number(dbUrl.port),
          username: dbUrl.username,
          password: dbUrl.password,
          minifyAliases: true,
          logQueryParameters: true,
          schema: 'public',
          hooks: true,
          dialectOptions: {
            useUTC: false,
          },
          ...options,
          logging: (sql, timing) => {
            logger[<LogLevel>options.logging](`${sql}, ${timing}`);
          },
        };
      },
    }),
  ],
  providers: [],
  exports: [],
})
export class SequelizeModule {}
