import { EUserRole } from "../enums/user-role.enum"
import { IsEnum } from "class-validator"

export class CreateUserDto {
  readonly name: string
  readonly email: string
  readonly password: string
  readonly passwordConfirmation: string
  @IsEnum(EUserRole)
  readonly role: EUserRole[]
}