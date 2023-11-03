import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { PrismaService } from "src/prisma/prisma.service";
import { JWT_STRATEGY } from "../constants";
import { BackofficeClient, Client } from "@prisma/client";

@Injectable()
export class JwtStrategy extends PassportStrategy(
    Strategy,
    JWT_STRATEGY,
) {
    constructor(
        private prisma: PrismaService,
        config: ConfigService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: config.get<string>('JWT_SECRET'),
        })
    }

    // append jwt payload to request
    async validate(payload: { sub: string }) {
        let user: BackofficeClient | Client

        user = await this.prisma.backofficeClient.findUnique({ where: { id: payload.sub } })
        if (!user) {
            user = await this.prisma.client.findUnique({
                where: {
                    id: payload.sub,
                },
            })
        }
        if (!user) {
            return null
        }

        return {
            id: user.id,
        }
    }
}
