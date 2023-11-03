import { Controller, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guard';

@ApiTags('client')
@UseGuards(JwtGuard)
@Controller('product')
export class ProductController {}
