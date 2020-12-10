import { IsNotEmpty } from "class-validator"

export class getImagesDto {
  @IsNotEmpty()
  readonly barberId: string
}