import { decorator } from "libs/shared/src/decorator";

@decorator.ajv.Schema({
  type: 'object',
  properties: {
    title: {
      type: 'string',
    },
    startDate: {
      type: 'string',
      format: 'date',
    },
    endDate: {
      type: 'string',
      format: 'date',
    }
  },
  required: ['title', 'startDate', 'endDate']
})
export class CreateNotificationInput  {
  declare title?: string;

  declare startDate?: Date;

  declare endDate?: Date;
}