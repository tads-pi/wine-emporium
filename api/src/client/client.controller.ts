import { Body, Controller, Get, HttpCode, HttpStatus, Post, Put, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ClientService } from './client.service';
import { ClientSignInDTO, ClientSignUpDTO, ClientUpdateDTO } from './dto';
import { JwtGuard } from '../auth/guard';
import { GetClient } from './decorator/client.decorator';
import { ClientViewmodel } from './viewmodels/client.viewmodel';
import { AuthViewmodel } from '../auth/viewmodel/auth.viewmodel';

@ApiTags('client')
@Controller('client')
export class ClientController {
    constructor(
        private svc: ClientService
    ) { }

    @Post('auth')
    @HttpCode(HttpStatus.OK)
    async clientSignIn(
        @Body() dto: ClientSignInDTO,
    ): Promise<AuthViewmodel> {
        return await this.svc.signIn(dto);
    }

    @Post('register')
    @HttpCode(HttpStatus.OK)
    async clientSignUp(
        @Body() dto: ClientSignUpDTO,
    ): Promise<AuthViewmodel> {
        return await this.svc.signUp(dto);
    }

    @Put('update')
    @UseGuards(JwtGuard)
    @HttpCode(HttpStatus.OK)
    async clientUpdate(
        @GetClient('id') clientId: string,
        @Body() dto: ClientUpdateDTO,
    ): Promise<ClientViewmodel> {
        return await this.svc.update(clientId, dto);
    }

    @Get("me")
    @UseGuards(JwtGuard)
    async getMe(
        @GetClient('id') id: string
    ): Promise<ClientViewmodel> {
        return await this.svc.getMe(id);
    }
}
