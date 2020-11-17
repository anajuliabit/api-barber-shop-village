import { Document } from "mongoose";
import { EUserRole } from "../enums";

export class User extends Document {
    id?: string
    active?: boolean
    email: string
    name: string
    password?: string
    roles?: EUserRole[]
}