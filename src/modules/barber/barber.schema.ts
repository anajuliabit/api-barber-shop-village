import * as mongoose from 'mongoose'

import { haircutTypeList } from './enums'

export const BarberSchema = new mongoose.Schema({
  active: { type: Boolean, default: true },
  cutPrice: { type: Number, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  haircutType: [{ type: String, enum: haircutTypeList }],
  workTime: [{
      day: { type: Date, required: true },
      hours: [{ type: Date, required: true }]
  }],
  description: { type: String },
  portfolio: {
      type: Array,
      required: false
  },
  feedback: {
    type: Array,
    required: false
  }
}, { timestamps: true, collection: 'barbers' })