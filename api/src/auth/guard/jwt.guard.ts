import { AuthGuard } from "@nestjs/passport";
import { JWT_STRATEGY } from "../constants";

export class JwtGuard extends AuthGuard(JWT_STRATEGY) {
    constructor() {
        super()
    }
}

// TODO Fazer uma guard pra backoffice e outra pra client