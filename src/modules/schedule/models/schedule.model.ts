import { Document } from "mongoose";

export class Schedule extends Document {
    id?: string
    active?: boolean
    date: Date
    clientId: string
    barberId: string
    finished: boolean 
}