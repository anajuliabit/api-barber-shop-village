import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'

import { JwtPayload } from '../interfaces/payload.interface'
import { User } from '../../user/models/user.model'
import { UserService } from '../../user/user.service'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRETKEY,
    })
  }

  async validate(payload: JwtPayload): Promise<User> {
    const user = await this.userService.findById(payload.id)
    if (!user) throw new HttpException('Requisição não autorizada.', HttpStatus.UNAUTHORIZED)
    return user
  }
}