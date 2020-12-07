import { CallHandler, Injectable, NestInterceptor, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common'
import { Observable } from 'rxjs'

@Injectable()
export class UserRoleInterceptor implements NestInterceptor {
  constructor(public permissions: string[]) { }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const user = context.switchToHttp().getRequest().user
    let hasPermission = false
    user.roles.forEach((role: string) => {
      if (this.permissions.includes(role)) hasPermission = true
    })

    if (!hasPermission) throw new HttpException('Você não deveria estar aqui!', HttpStatus.FORBIDDEN)
    return next.handle()
  }
}
