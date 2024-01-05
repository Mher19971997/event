import { Module } from '@nestjs/common';
import { EventController } from 'src/event/event.controller';
import { EventService } from 'src/event/event.service';

@Module({
  controllers: [EventController],
  providers: [EventService],
  exports: [EventService]
})
export class EventModule {}