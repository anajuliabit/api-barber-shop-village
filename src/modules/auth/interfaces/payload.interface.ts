import { EUserRole } from "src/modules/user/enums/user-role.enum";

export interface JwtPayload {
  readonly id: string
  readonly permissions: EUserRole[]
}