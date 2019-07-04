/**
 * Auth module.
 * @file 权限与管理员模块
 * @module module/auth/module
 * @author Surmon <https://github.com/surmon-china>
 */

import * as APP_CONFIG from '@app/app.config';
import * as jwt from 'jsonwebtoken';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypegooseModule } from 'nestjs-typegoose';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { Auth } from './auth.model';

@Module({
  imports: [
    TypegooseModule.forFeature([Auth]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secretOrPrivateKey: APP_CONFIG.AUTH.jwtTokenSecret as jwt.Secret,
      signOptions: {
        expiresIn: APP_CONFIG.AUTH.expiresIn as number,
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
