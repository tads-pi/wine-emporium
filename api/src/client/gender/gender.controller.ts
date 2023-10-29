import { Controller, Get } from '@nestjs/common';
import { GenderService } from './gender.service';

@Controller('gender')
export class GenderController {
    constructor(
        private svc: GenderService
    ) { }

    @Get()
    async getAllGenders() {
        return await this.svc.getAllGenders();
    }
}
