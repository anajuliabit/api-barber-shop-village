
export class CreateClientDto {
    readonly name: string
    readonly email: string
    readonly password: string
    readonly passwordConfirmation: string
    readonly image?: string
  }