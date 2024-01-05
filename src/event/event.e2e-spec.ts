// e2e-spec.ts

import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { Event } from 'libs/service/src/model/event';
import { AppModule } from 'src/app.module';
import { SequelizeModule, getModelToken } from '@nestjs/sequelize';
import { Op } from 'sequelize'; // Import Op from sequelize

describe('EventController (e2e)', () => {
  let app: INestApplication;
  let eventModel: typeof Event;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule,
        SequelizeModule.forRoot({
          dialect: 'sqlite',
          storage: ':memory:',
          synchronize: true,
          models: [Event],
        }),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    eventModel = moduleFixture.get<typeof Event>(getModelToken(Event));
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('GET /event', () => {
    it('should return an array of events', async () => {
      const testEvent = {
        title: 'This is test Event',
        startDate: new Date('2024-05-05'),
        endDate: new Date('2024-05-05'),
      };
      await eventModel.create(testEvent);

      const response = await request(app.getHttpServer()).get('/event').expect(HttpStatus.OK);

      expect(response.body).toBeInstanceOf(Array);
    });
  });

  describe('EventService methods', () => {
    it('should check for overlap and return null if no overlap', async () => {
      const startDate = new Date('2024-05-01');
      const endDate = new Date('2024-05-03');

      const overlappingRecord = await eventModel.findOne({
        where: {
          startDate: {
            [Op.lt]: endDate,
          },
          endDate: {
            [Op.gt]: startDate,
          },
        },
      });

      expect(overlappingRecord).toBeNull();
    });

    it('should create an event if there is no overlap', async () => {
      const createEventDto = {
        title: 'New Event',
        startDate: new Date('2024-06-01'),
        endDate: new Date('2024-06-03'),
      };

      const createdEvent = await eventModel.create(createEventDto);

      expect(createdEvent).toBeDefined();
    });

    it('should check for overlap within E2E test', async () => {
      const startDate = new Date('2024-07-01');
      const endDate = new Date('2024-07-03');
      const testEvent = {
        title: 'Overlapping Event',
        startDate: new Date('2024-07-02'),
        endDate: new Date('2024-07-04'),
      };
      await eventModel.create(testEvent);

      const overlappingRecord = await eventModel.findOne({
        where: {
          startDate: {
            [Op.lt]: endDate,
          },
          endDate: {
            [Op.gt]: startDate,
          },
        },
      });

      expect(overlappingRecord).toBeDefined();
    });

  });
});