import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { RegisterService } from './register.service';
import { RegisterController } from './register.controller';
import { User, UserAuth, AuthLog } from '../entity';

@Module({
  providers: [RegisterService],
  imports: [TypeOrmModule.forFeature([User, UserAuth, AuthLog]), ConfigModule],
  controllers: [RegisterController],
})
export class RegisterModule {}
