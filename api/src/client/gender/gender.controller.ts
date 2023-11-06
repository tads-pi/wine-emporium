import { Controller, Get } from '@nestjs/common';
import { GenderService } from './gender.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('client/gender')
@Controller('client/gender')
export class GenderController {
    constructor(
        private svc: GenderService
    ) { }

    @Get()
    async getAllGenders() {
        console.log("BUILD UPDATE TEST");
        // return await this.svc.getAllGenders();
        return [
            {
                "aloha": "aloha"
            }
        ]
    }
}
