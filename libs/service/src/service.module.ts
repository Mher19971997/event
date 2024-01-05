import { DynamicModule, Global, Module } from '@nestjs/common';
import { ModelModule } from 'libs/service/src/model/model.module';
import { SequelizeModule } from 'libs/shared/src/sequelize/sequelize.module';
import { ConfigModule } from 'libs/shared/src/config/config.module';


@Global()
@Module({
  imports: [ModelModule]
})
export class ServiceModule {
  static register(): DynamicModule {
    const services = [ConfigModule, SequelizeModule, ModelModule];
    return {
      module: ServiceModule,
      imports: services,
      exports: services
    };
  }
}
