import { JwtStorage } from './jwt.strategy';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { LocalStorage } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserModule } from 'src/user/user.module';
import { HttpModule } from '@nestjs/axios';

const jwtModule = JwtModule.register({
  secret: 'GouDanEr',
  signOptions: { expiresIn: '1d' },
});

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    HttpModule,
    PassportModule,
    jwtModule,
    UserModule,
  ],
  controllers: [AuthController],
  providers: [
    ConfigService,
    AuthService,
    LocalStorage,
    UserService,
    JwtStorage,
  ],
  exports: [JwtModule, AuthService],
})
export class AuthModule {}
