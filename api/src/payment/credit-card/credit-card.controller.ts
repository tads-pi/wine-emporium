import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guard';
import { CreditCardService } from './credit-card.service';
import { GetClient } from 'src/client/decorator/client.decorator';
import { ClientCreditCardViewmodel } from './viewmodel/client-credit-card.viewmodel';
import { SaveCreditCardDTO } from './dto/save-credit-card.dto';

@ApiTags('client/credit-card')
@Controller('client/credit-card')
@UseGuards(JwtGuard)
export class CreditCardController {
    constructor(
        private svc: CreditCardService
    ) { }

    @Get('')
    async getAllCreditCards(
        @GetClient('id') clientId: string
    ): Promise<ClientCreditCardViewmodel[]> {
        return this.svc.getAllCreditCards(clientId);
    }

    @Post('')
    async saveNewCreditCard(
        @GetClient('id') clientId: string,
        @Body() dto: SaveCreditCardDTO,
    ): Promise<null> {
        return this.svc.saveNewCreditCard(clientId, dto);
    }
}
