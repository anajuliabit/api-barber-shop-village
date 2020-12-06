import { EHaircutType } from "../enums"
import { WorkTime } from "../models/barber.model"

export class CreateBarberDto {
    name: string
    email: string
    password: string
    passwordConfirmation: string
    cutPrice: number
    haircutType: EHaircutType[]
    workTime: WorkTime[]
    description: string
  }