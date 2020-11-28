import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt'
import { CreateUserDto } from '../user/dto/create-user.dto';
import { EUserRole } from '../user/enums/user-role.enum';
import { User } from '../user/models/user.model';

import { UserService } from '../user/user.service';
import { LoginUserDto } from './dtos/login-user.dto';
import { JwtPayload } from './interfaces/payload.interface';

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

  async signinUser(data: LoginUserDto): Promise<string> {
    const user = await this.userService.findByEmail(data.username)
    if (!user) throw new HttpException('Email ou senha incorretos. Por favor tente novamente!', HttpStatus.UNAUTHORIZED)

    if (data.client === EUserRole.admin) {
      const isAdmin = user.roles.includes(EUserRole.admin)
      if (!isAdmin) throw new HttpException('Você não deveria estar aqui!', HttpStatus.FORBIDDEN)
    }

    if (data.client === EUserRole.barber) {
      const isBarber = user.roles.includes(EUserRole.barber)
      if (!isBarber) throw new HttpException('Você não deveria estar aqui!', HttpStatus.FORBIDDEN)
    }

    const validatePassword = await bcrypt.compare(data.password, user.password || '')
    if (!validatePassword) throw new HttpException('Email ou senha incorretos. Por favor tente novamente!', HttpStatus.UNAUTHORIZED)

    const payload: JwtPayload = { id: user._id, permissions: user.roles }
    const accessToken =  this.jwtService.sign(payload, { expiresIn: "24h" })

    return accessToken
  }
}