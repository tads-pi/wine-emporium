import { Controller, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guard';

@ApiTags('cart')
@UseGuards(JwtGuard)
@Controller('cart')
export class CartController { }
