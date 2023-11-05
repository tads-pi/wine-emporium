import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JWT_STRATEGY } from "../constants";

@Injectable()
export class JwtStrategy extends PassportStrategy(
    Strategy,
    JWT_STRATEGY,
) {
    constructor(config: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: config.get<string>('JWT_SECRET'),
        })
    }

    async validate(payload: { sub: string }) {
        return { id: payload.sub }
    }
}
