import { Global, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategy';
import { JwtModule } from '@nestjs/jwt';

@Global()
@Module({
  imports: [JwtModule.register({})],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService]
})
export class AuthModule { }
