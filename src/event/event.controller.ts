import * as c from '@nestjs/common';
import { eventDto } from 'src/event/dto';
import { EventService } from 'src/event/event.service';

@c.Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @c.Post()
  async create(@c.Body() inputDto: eventDto.inputs.CreateNotificationInput) {
    return this.eventService.create(inputDto);
  }

  @c.Get()
  async findAll(@c.Query() filterDto: eventDto.inputs.FilterEventInput) {
    return this.eventService.findAll(filterDto);
  }
}