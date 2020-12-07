export enum EScheduleStatus {
    FINISHED = 'FINISHED',
    SCHEDULED = 'SCHEDULED',
    CANCELED = 'CANCELED',
    PENDING = 'PENDING'
}

export const scheduleStatusList: string[] = Object.keys(EScheduleStatus).map(key => EScheduleStatus[key])
