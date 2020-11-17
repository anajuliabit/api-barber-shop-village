import { EUserRole } from "src/modules/user/enums";

export interface JwtPayload {
  readonly id: string
  readonly permissions: any[]
}
