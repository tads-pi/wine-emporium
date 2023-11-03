import { AuthGuard } from "@nestjs/passport";
import { JWT_STRATEGY } from "../constants";

export class JwtGuard extends AuthGuard(JWT_STRATEGY) {
    constructor() {
        super()
    }
}