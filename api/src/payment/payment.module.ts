import { Module } from '@nestjs/common';
import { BankSlipService } from './bank-slip/bank-slip.service';
import { BankSlipController } from './bank-slip/bank-slip.controller';
import { CreditCardService } from './credit-card/credit-card.service';
import { CreditCardController } from './credit-card/credit-card.controller';

@Module({
  providers: [BankSlipService, CreditCardService],
  controllers: [BankSlipController, CreditCardController],
})
export class PaymentModule {}
