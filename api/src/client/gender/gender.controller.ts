import { Controller, Get } from '@nestjs/common';
import { GenderService } from './gender.service';
import { ApiTags } from '@nestjs/swagger';
import { GenderDTO } from './dto/gender.dto';

@ApiTags('client/gender')
@Controller('client/gender')
export class GenderController {
    constructor(
        private svc: GenderService
    ) { }

    @Get()
    async getAllGenders(): Promise<GenderDTO[]> {
        return await this.svc.getAllGenders();
    }
}
