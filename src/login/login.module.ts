import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { AuthLog, User, UserAuth } from '../entity';
import { PasswordBoxService } from './passwordbox.service';

@Module({
  providers: [LoginService, PasswordBoxService],
  imports: [TypeOrmModule.forFeature([User, UserAuth, AuthLog]), ConfigModule],
  controllers: [LoginController],
})
export class LoginModule {}
