import * as mongoose from 'mongoose'

import { scheduleStatusList } from './enums/schedule-status.enum'

export const ScheduleSchema = new mongoose.Schema({
  active: { type: Boolean, default: true },
  date: { type: Date, required: true },
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  barberId: { type: mongoose.Schema.Types.ObjectId, ref: 'Barber', required: true, index: true },
  status: { type: String, enum: scheduleStatusList, required: true }
}, { timestamps: true, collection: 'schedules' })