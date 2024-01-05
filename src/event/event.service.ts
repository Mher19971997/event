import { Injectable } from '@nestjs/common';
import * as st from '@nestjs/sequelize';
import * as assert from 'assert';

import { Event } from 'libs/service/src/model/event';
import { l10n } from 'libs/shared/src/config/l10n-constants';
import { eventDto } from 'src/event/dto';
import { Op } from 'sequelize';

@Injectable()
export class EventService  {
  constructor(
    @st.InjectModel(Event)
    private readonly eventModel: typeof Event,
  ) {}

  async checkForOverlap(startDate: Date, endDate: Date): Promise<Event | null> {
    assert(startDate !== endDate, l10n.cant_be_equal);

    return this.eventModel.findOne({
      where: {
        startDate: { [Op.lt]: endDate },
        endDate: { [Op.gt]: startDate },
      },
    });
  }

  async create(inputDto: eventDto.inputs.CreateNotificationInput) {
    assert(inputDto.startDate < inputDto.endDate, l10n.start_before_must);

    const overlappingRecord = await this.checkForOverlap(inputDto.startDate, inputDto.endDate);
    
    assert(!overlappingRecord, l10n.event_day_exit);
    
    return this.eventModel.create(inputDto); 
  }

  async findAll(filterDto: eventDto.inputs.FilterEventInput) {
    return this.eventModel.findAll({ where: { ...filterDto } });
  }
}