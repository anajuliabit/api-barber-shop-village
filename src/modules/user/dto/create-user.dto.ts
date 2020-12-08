import { EUserRole } from "../enums/user-role.enum"
import { IsNotEmptyObject } from "class-validator"

export class CreateUserDto {
  readonly name?: string
  readonly email?: string
    password?: string
    passwordConfirmation?: string
  readonly roles?: EUserRole[]
  @IsNotEmptyObject()
  readonly profilePicture?: string
}