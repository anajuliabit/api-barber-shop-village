import { Document } from "mongoose";
import { EScheduleStatus } from "../enums/schedule-status.enum";

export class Schedule extends Document {
    id?: string
    active?: boolean
    date: Date
    clientId: string
    barberId: string
    status: EScheduleStatus 
}