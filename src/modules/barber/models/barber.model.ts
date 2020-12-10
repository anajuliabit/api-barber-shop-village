import { Document } from "mongoose";
import { EHaircutType } from "../enums";

export class WorkTime {
    day: Date
    hours: Date[]
}

export class Barber extends Document {
    id?: string
    name: string
    email: string
    active?: boolean
    cutPrice: number
    userId: string
    haircutType?: EHaircutType[]
    workTime?: WorkTime[]
    feedback?: any
    portfolio?: Record<string, unknown>
}

export class BarberModel extends Barber {}

