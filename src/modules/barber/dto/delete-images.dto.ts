import { IsNotEmpty } from "class-validator"

export class DeleteImagesDto {
    @IsNotEmpty()
    readonly imagePaths: string[]

}