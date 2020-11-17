import * as mongoose from 'mongoose'


export const UserSchema = new mongoose.Schema({
  active: { type: Boolean, default: true },
  date: { type: Date, required: true },
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true, index: true },
  barberId: { type: mongoose.Schema.Types.ObjectId, ref: 'Barber', required: true, index: true },
  finished: { type: Boolean, default: false }
}, { timestamps: true, collection: 'users' })