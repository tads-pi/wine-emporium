import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { GenderViewmodel } from './viewmodel';

@Injectable()
export class GenderService {
    constructor(
        private db: PrismaService
    ) { }

    async getAllGenders(): Promise<GenderViewmodel[]> {
        const genders = await this.db.gender.findMany();
        if (genders.length === 0) {
            return []
        }

        const gendersDTO: GenderViewmodel[] = genders.map((gender) => {
            return {
                id: gender.id,
                name: gender.firiendlyName,
            }
        })

        return gendersDTO
    }
}
