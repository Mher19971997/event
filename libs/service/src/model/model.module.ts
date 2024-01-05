import { DynamicModule, Module } from '@nestjs/common';
import { EventEntry } from './event';

const models: DynamicModule[] = [EventEntry];

@Module({
  imports: models,
  exports: models
})
export class ModelModule {}
