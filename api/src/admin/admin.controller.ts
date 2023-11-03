import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { AdminService } from './admin.service';
import { ClientBackofficeViewmodel } from './viewmodel';
import { ApiTags } from '@nestjs/swagger';
import { SaveBackofficeClientDTO, UpdateBackofficeClientDTO } from './dto';

@ApiTags('backoffice')
@Controller('backoffice')
export class AdminController {
    constructor(
        private svc: AdminService
    ) { }

    @Get('user')
    async getAllUsers(): Promise<ClientBackofficeViewmodel[]> {
        return this.svc.getAllUsers();
    }

    @Post('user')
    async saveUser(
        @Body() dto: SaveBackofficeClientDTO,
    ): Promise<null> {
        return this.svc.saveUser(dto);
    }

    @Put('user/:id')
    async updateUser(
        @Param('id') id: string,
        @Body() dto: UpdateBackofficeClientDTO,
    ): Promise<null> {
        return this.svc.updateUser(id, dto);
    }

    @Get('user/:id')
    async getUserById(
        @Param('id') id: string,
    ): Promise<ClientBackofficeViewmodel> {
        return this.svc.getUserById(id);
    }

    @Delete('user/:id')
    async toggleUserActive(
        @Param('id') id: string,
    ): Promise<null> {
        return this.svc.toggleUserActive(id);
    }
}