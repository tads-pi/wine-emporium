import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ClientService } from './client.service';
import { ClientSignInDTO, ClientSignUpDTO } from './dto';
import { JwtGuard } from 'src/auth/guard';
import { GetClient } from './decorator/client.decorator';

@ApiTags('client')
@Controller('client')
export class ClientController {
    constructor(
        private svc: ClientService
    ) { }

    @Post('auth')
    @HttpCode(HttpStatus.OK)
    async clientSignIn(
        @Req() req: any,
        @Body() dto: ClientSignInDTO,
    ) {
        return await this.svc.signIn(dto);
    }

    @Post('register')
    @HttpCode(HttpStatus.OK)
    async clientSignUp(
        @Req() req: any,
        @Body() dto: ClientSignUpDTO,
    ) {
        return await this.svc.signUp(dto);
    }

    @Get("me")
    @UseGuards(JwtGuard)
    async getMe(
        @GetClient('id') id: string
    ) {
        return await this.svc.getMe(id);
    }

    @Get("anonymous")
    async newAnonymousClient() {
        return await this.svc.newAnonymousClient();
    }
}
