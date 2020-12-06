import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { PassportStrategy } from '@nestjs/passport'

import { ExtractJwt, Strategy } from 'passport-jwt'
import { Model } from 'mongoose'

import { IUser } from '../user/interfaces/user.interface'

import { JwtPayload } from './interfaces/payload.interface'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectModel('User')
        private readonly userModel: Model<IUser>,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRETKEY,
        })
    }

    async validate(payload: JwtPayload): Promise<IUser> {
        const { id: _id } = payload
        const user = await this.userModel.findOne({ _id, "active": true }, 'email name roles').exec()

        if (!user) {
            throw new HttpException('Você não tem permissão.', HttpStatus.UNAUTHORIZED)
        }

        return user
    }
}