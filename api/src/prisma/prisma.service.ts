import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
    constructor(
        // acessa variaveis de ambiente
        config: ConfigService
    ) {
        super({
            datasources: {
                db: {
                    url: config.get<string>('DATABASE_URL'),
                }
            }
        })
    }
}
