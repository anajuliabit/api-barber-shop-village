import { IsNotEmptyObject } from "class-validator"

export class UploadFilesDto {
    @IsNotEmptyObject()
    readonly images: Record<string, unknown>
}