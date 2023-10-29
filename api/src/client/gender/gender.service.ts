import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class GenderService {
    constructor(
        private db: PrismaService
    ) { }

    async getAllGenders() {
        return await this.db.gender.findMany();
    }
}
