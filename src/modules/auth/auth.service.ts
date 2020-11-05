import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt'
import { CreateUserDto } from '../user/dto';
import { User } from '../user/models';

import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService) { }
    
      private readonly saltRounds = parseInt(process.env.BCRYPT_ROUNDS)
    
      async registerUser(data: CreateUserDto): Promise<User> {
        if (data.password !== data.passwordConfirmation)
          throw new HttpException('As senhas precisam ser iguais.', HttpStatus.BAD_REQUEST)
    
        const user = await this.userService.findByEmail(data.email)
        if (user) throw new HttpException('Email ou telefone já cadastrado.', HttpStatus.BAD_REQUEST)
    
        const userPassword = bcrypt.hashSync(data.password, this.saltRounds)
        const createUser = await this.userService.create({ ...data, password: userPassword })
        delete createUser.password
        if (!createUser._id) throw new HttpException('Não foi possível completar o cadastro. Tente novamente.', HttpStatus.INTERNAL_SERVER_ERROR)
        return createUser
      }
}
