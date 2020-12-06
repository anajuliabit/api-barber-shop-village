import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthInfo } from 'aws-sdk/clients/iot';
import * as bcrypt from 'bcrypt'
import { CreateUserDto } from '../user/dto/create-user.dto';
import { EUserRole } from '../user/enums/user-role.enum';
import { User } from '../user/models/user.model';

import { UserService } from '../user/user.service';
import { LoginUserDto } from './dtos/login-user.dto';
import { IAuth } from './interfaces/auth.interface';
import { JwtPayload } from './interfaces/payload.interface';
import { AwsService } from '../shared/aws/aws.service'

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly awsService: AwsService) { }

  private readonly saltRounds = parseInt(process.env.BCRYPT_ROUNDS)

  async registerUser(dataObj): Promise<User> {
    const { file } = dataObj;
    const { data } = dataObj;
    if (data.password !== data.passwordConfirmation)
      throw new HttpException('As senhas precisam ser iguais.', HttpStatus.BAD_REQUEST)

    const user = await this.userService.findByEmail(data.email)
    if (user) throw new HttpException('Email ou telefone já cadastrado.', HttpStatus.BAD_REQUEST)
    let profilePictureName : String = "";
    
    if(file) {
      profilePictureName = await this.awsService.upload(data.email, file)
    }
    const userPassword = bcrypt.hashSync(data.password, this.saltRounds)
    const createUser = await this.userService.create({ ...data, password: userPassword, profilePicture: profilePictureName })
    delete createUser.password
    if (!createUser._id) throw new HttpException('Não foi possível completar o cadastro. Tente novamente.', HttpStatus.INTERNAL_SERVER_ERROR)
    return createUser
  }

  async signinUser(data: LoginUserDto): Promise<IAuth> {
    const user = await this.userService.findByEmail(data.email)

    if (!user) throw new HttpException('Email ou senha incorretos. Por favor tente novamente!', HttpStatus.UNAUTHORIZED)

    if (data.client === EUserRole.ADMIN) {
      const isAdmin = user.roles.includes(EUserRole.ADMIN)
      if (!isAdmin) throw new HttpException('Você não deveria estar aqui!', HttpStatus.FORBIDDEN)
    }

    if (data.client === EUserRole.BARBER) {
      const isBarber = user.roles.includes(EUserRole.BARBER)
      if (!isBarber) throw new HttpException('Você não deveria estar aqui!', HttpStatus.FORBIDDEN)
    }

    const validatePassword = await bcrypt.compare(data.password, user.password || '')
    if (!validatePassword) throw new HttpException('Email ou senha incorretos. Por favor tente novamente!', HttpStatus.UNAUTHORIZED)

    const payload: JwtPayload = { id: user._id, permissions: user.roles }
    const accessToken =  this.jwtService.sign(payload)

    return { accessToken, payload }
  }
}