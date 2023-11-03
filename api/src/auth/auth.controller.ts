import { Body, Controller, HttpCode, HttpStatus, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { ClientSignInDTO, ClientSignUpDTO } from './dto/client.dto';
import { BackofficeClientSignInDTO } from './dto';

@ApiTags('auth')
@Controller()
export class AuthController {
    constructor(
        private svc: AuthService
    ) { }

    @Post('store/auth')
    @HttpCode(HttpStatus.OK)
    async clientSignIn(
        @Req() req: any,
        @Body() dto: ClientSignInDTO,
    ) {
        return await this.svc.clientSignIn(dto);
    }

    @Post('store/register')
    @HttpCode(HttpStatus.OK)
    async clientSignUp(
        @Req() req: any,
        @Body() dto: ClientSignUpDTO,
    ) {
        return await this.svc.clientSignUp(dto);
    }

    @Post('backoffice/auth')
    @HttpCode(HttpStatus.OK)
    async backofficeClientSignIn(
        @Body() dto: BackofficeClientSignInDTO,
    ) {
        return await this.svc.backofficeClientSignIn(dto);
    }
}
