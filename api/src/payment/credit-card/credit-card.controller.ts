import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '../../auth/guard';
import { CreditCardService } from './credit-card.service';
import { GetClient } from '../../client/decorator/client.decorator';
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
    ): Promise<ClientCreditCardViewmodel> {
        return this.svc.saveNewCreditCard(clientId, dto);
    }

    @Delete('/:creditCardId')
    async deleteCreditCard(
        @GetClient('id') clientId: string,
        @Param('creditCardId') creditCardId: string,
    ): Promise<null> {
        return this.svc.deleteCreditCard(clientId, creditCardId);
    }
}
