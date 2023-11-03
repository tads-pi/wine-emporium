import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GroupService } from './group.service';
import { BackofficeGroup } from '@prisma/client';

@ApiTags('backoffice')
@Controller('backoffice')
export class GroupController {
    constructor(
        private svc: GroupService
    ){}

    @Get('group')
    async getAllGroups(): Promise<BackofficeGroup[]> {
        return this.svc.getAllGroups();
    }
}
