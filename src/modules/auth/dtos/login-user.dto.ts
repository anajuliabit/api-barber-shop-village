import { IsNotEmpty, IsString, MinLength, MaxLength, IsBoolean, IsOptional } from 'class-validator'
import { EUserRole } from 'src/modules/user/enums/user-role.enum'

export class LoginUserDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(100)
  readonly email: string

  @IsNotEmpty()
  @IsString()
  readonly password: string

  @IsOptional()
  @IsBoolean()
  readonly client?: EUserRole

}