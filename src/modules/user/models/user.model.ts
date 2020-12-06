import { Document } from "mongoose";
import { EUserRole } from "../enums/user-role.enum";

export class User extends Document {
  id?: string
  active?: boolean
  email: string
  name: string
  password?: string
  roles?: EUserRole[]
  profileImage: string
}