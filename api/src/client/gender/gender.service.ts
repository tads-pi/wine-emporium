import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { GenderDTO } from './dto/gender.dto';

@Injectable()
export class GenderService {
    constructor(
        private db: PrismaService
    ) { }

    async getAllGenders(): Promise<GenderDTO[]> {
        const genders = await this.db.gender.findMany();
        if (genders.length === 0) {
            return []
        }

        const gendersDTO: GenderDTO[] = genders.map((gender) => {
            return {
                id: gender.id,
                name: gender.firiendlyName,
            }
        })

        return gendersDTO
    }
}
