import {  Model } from 'sequelize-typescript';
import { SequelizeModule } from '@nestjs/sequelize';
import * as st from 'sequelize-typescript';
import { EventEntity } from 'src/event/dto/output';

@st.Table({
  tableName: 'events',
  modelName: 'Event',
  timestamps: true,
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  deletedAt: 'deletedAt',
})
export class Event extends Model<EventEntity> {

  @st.PrimaryKey
  @st.Column({
    type: st.DataType.INTEGER,
    autoIncrement: true,
  })
  declare id: number;

  @st.Column({
    type: st.DataType.STRING,
  })
  declare title: string;

  @st.Column({
    type: st.DataType.DATE,
  })
  declare startDate: Date;

  @st.Column({
    type: st.DataType.DATE,
  })
  declare endDate: Date;

  @st.Column({ type: st.DataType.DATE })
  declare createdAt: Date;

  @st.Column({ type: st.DataType.DATE })
  declare updatedAt: Date;

  @st.Column({ type: st.DataType.DATE })
  declare deletedAt: Date;
}

export const EventEntry = SequelizeModule.forFeature([Event]);
