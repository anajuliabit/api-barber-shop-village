import { JwtPayload } from "./payload.interface";

export interface IAuth {
    accessToken: string;
    payload: JwtPayload;
}