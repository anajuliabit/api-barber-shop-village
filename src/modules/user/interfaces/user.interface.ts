import { Document } from 'mongoose'
import { EUserRole } from "../enums/user-role.enum"

export interface IUser extends Document {
    readonly name: string
    readonly email: string
    readonly password: string
    readonly passwordConfirmation: string
    readonly role: EUserRole[]
}