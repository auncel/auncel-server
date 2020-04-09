import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { LoggerModule } from './logger/logger.module';
import { ConfigModule } from './config/config.module';
import { Session } from './session/session.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    LoggerModule,
    UserModule,
    ConfigModule,
    Session,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {

}
