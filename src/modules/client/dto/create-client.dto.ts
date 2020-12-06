import { IsNotEmptyObject } from "class-validator"

export class CreateClientDto {
    readonly name: string
    readonly email: string
    readonly password: string
    readonly passwordConfirmation: string
    @IsNotEmptyObject()
    readonly image?: Record<string, unknown>
  }