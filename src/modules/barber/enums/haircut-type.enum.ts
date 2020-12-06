export enum EHaircutType {
    STRAIGHT = 'STRAIGHT',
    CURLY = 'CURLY',
    WAVY = 'WAVY',
    CRISP = 'CRISP'
}

export const haircutTypeList: string[] = Object.keys(EHaircutType).map(key => EHaircutType[key])
