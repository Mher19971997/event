import { Module } from '@nestjs/common';
import { ServiceModule } from 'libs/service/src/service.module';
import { ConfigModule } from 'libs/shared/src/config/config.module';
import { SequelizeModule } from 'libs/shared/src/sequelize/sequelize.module';
import { EventModule } from 'src/event/event.module';

@Module({
  imports: [    
    ServiceModule.register(),
    ConfigModule.forRoot(),
    SequelizeModule,
    EventModule
  ],
  controllers: [],
})
export class AppModule {}
