import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { BankSlipService } from './bank-slip/bank-slip.service';
import { BankSlipController } from './bank-slip/bank-slip.controller';
import { CreditCardService } from './credit-card/credit-card.service';
import { CreditCardController } from './credit-card/credit-card.controller';

@Module({
  providers: [PaymentService, BankSlipService, CreditCardService],
  controllers: [PaymentController, BankSlipController, CreditCardController],
})
export class PaymentModule {}
