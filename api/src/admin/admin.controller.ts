import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { AdminService } from './admin.service';
import { BackofficeClientViewmodel } from './viewmodel';
import { ApiTags } from '@nestjs/swagger';
import { BackofficeClientSignInDTO, SaveBackofficeClientDTO, UpdateBackofficeClientDTO } from './dto';
import { BackofficeGroupViewmodel } from './viewmodel/backoffice-group.viewmodel';

@ApiTags('backoffice')
@Controller('backoffice')
export class AdminController {
    constructor(
        private svc: AdminService
    ) { }

    @Post('auth')
    @HttpCode(HttpStatus.OK)
    async backofficeClientSignIn(
        @Body() dto: BackofficeClientSignInDTO,
    ) {
        return await this.svc.signIn(dto);
    }

    @Get('user')
    async getAllUsers(): Promise<BackofficeClientViewmodel[]> {
        return this.svc.getAllUsers();
    }

    @Post('user')
    async saveUser(
        @Body() dto: SaveBackofficeClientDTO,
    ): Promise<string> {
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
    ): Promise<BackofficeClientViewmodel> {
        return this.svc.getUserById(id);
    }

    @Delete('user/:id')
    async toggleUserActive(
        @Param('id') id: string,
    ): Promise<null> {
        return this.svc.toggleUserActive(id);
    }

    @Get('groups')
    async listGroups(): Promise<BackofficeGroupViewmodel[]> {
        return this.svc.listGroups();
    }
}
