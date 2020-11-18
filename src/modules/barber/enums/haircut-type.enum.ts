export enum EHaircutType {
    STRAIGHT,
    CURLY,
    WAVY,
    CRISP
}

export const haircutTypeList: string[] = Object.keys(EHaircutType).map(key => EHaircutType[key])
