import { Controller, Get } from '@nestjs/common';
import { AdminService } from './admin.service';
import { ClientBackofficeViewmodel } from './viewmodel';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('backoffice')
@Controller('backoffice')
export class AdminController {
    constructor(
        private svc: AdminService
    ) { }

    @Get('users')
    async getAllUsers(): Promise<ClientBackofficeViewmodel[]> {
        return this.svc.getAllUsers();
    }
}
