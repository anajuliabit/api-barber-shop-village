import { CreateUserDto } from "src/modules/user/dto/create-user.dto"

export class RegisterUserDto {
    file: Record<string, unknown>
    data: CreateUserDto
}