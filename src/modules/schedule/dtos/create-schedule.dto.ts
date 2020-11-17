
export class CreateScheduleDto {
    readonly id?: string
    readonly active?: boolean
    readonly date: Date
    readonly clientId: string
    readonly barberId: string
  }