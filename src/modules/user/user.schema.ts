
import * as mongoose from 'mongoose'

import { EUserRole } from './enums/user-role.enum'

const rolesOptions: string[] = Object.keys(EUserRole).map(key => EUserRole[key])

export const UserSchema = new mongoose.Schema({
  active: { type: Boolean, default: true },
  email: { type: String, trim: true, lowercase: true, unique: true, required: true },
  name: { type: String, trim: true, lowercase: true, required: true },
  password: { type: String, trim: true, required: true },
  roles: { type: [String], enum: rolesOptions, default: EUserRole.CLIENT },
  profilePicture: { type: String, trim: true, lowercase: true, required: false }
}, { timestamps: true, collection: 'users' })