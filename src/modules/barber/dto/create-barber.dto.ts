import { IsNotEmptyObject } from "class-validator"
import { EHaircutType } from "../enums"
import { WorkTime } from "../models/barber.model"

export class CreateBarberDto {
    name?: string
    email?: string
    password?: string
    passwordConfirmation?: string
    cutPrice?: number
    haircutType?: EHaircutType[]
    description?: string
    @IsNotEmptyObject()
    readonly image?: Record<string, unknown>
    workTime?: WorkTime[]
  }