import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { BackofficeClientViewmodel } from './viewmodel';
import { ApiTags } from '@nestjs/swagger';
import { BackofficeClientSignInDTO, SaveBackofficeClientDTO, UpdateBackofficeClientDTO } from './dto';
import { BackofficeGroupViewmodel } from './viewmodel/backoffice-group.viewmodel';
import { BackofficeAdminGuard, BackofficeGuard } from 'src/auth/guard/backoffice.guard';
import { JwtGuard } from 'src/auth/guard';

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
    @UseGuards(JwtGuard, BackofficeGuard)
    async getAllUsers(): Promise<BackofficeClientViewmodel[]> {
        return this.svc.getAllUsers();
    }

    @Post('user')
    @UseGuards(JwtGuard, BackofficeAdminGuard)
    async saveUser(
        @Body() dto: SaveBackofficeClientDTO,
    ): Promise<string> {
        return this.svc.saveUser(dto);
    }

    @Put('user/:id')
    @UseGuards(JwtGuard, BackofficeAdminGuard)
    async updateUser(
        @Param('id') id: string,
        @Body() dto: UpdateBackofficeClientDTO,
    ): Promise<null> {
        return this.svc.updateUser(id, dto);
    }

    @Delete('user/:id')
    @UseGuards(JwtGuard, BackofficeAdminGuard)
    async toggleUserActive(
        @Param('id') id: string,
    ): Promise<null> {
        return this.svc.toggleUserActive(id);
    }

    @Get('user/:id')
    @UseGuards(JwtGuard, BackofficeGuard)
    async getUserById(
        @Param('id') id: string,
    ): Promise<BackofficeClientViewmodel> {
        return this.svc.getUserById(id);
    }

    @Get('groups')
    @UseGuards(JwtGuard)
    async listGroups(): Promise<BackofficeGroupViewmodel[]> {
        return this.svc.listGroups();
    }
}
