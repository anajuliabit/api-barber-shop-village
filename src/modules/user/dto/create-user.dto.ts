import { EUserRole } from "../enums"

export class CreateUserDto {
    readonly name: string
    readonly email: string
    readonly password: string
    readonly passwordConfirmation: string
    readonly role: EUserRole
  }