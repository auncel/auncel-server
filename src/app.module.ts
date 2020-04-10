import { Module, OnModuleInit, Inject } from '@nestjs/common';
import { TypeOrmModule, InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { LoggerModule } from './logger/logger.module';
// import { ConfigModule } from './config/config.module';
import { Session } from './session/session.module';
import { LoggerService } from './logger/logger.service';
import { User, UserAuth, AuthLog } from './entity';
import { LoginModule } from './login/login.module';
import { RegisterModule } from './register/register.module';
import configuration from './config/config';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    LoggerModule,
    UserModule,
    ConfigModule.forRoot({
      load: [configuration],
    }),
    Session,
    TypeOrmModule.forFeature([User, UserAuth, AuthLog]),
    LoginModule,
    RegisterModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements OnModuleInit {
  @Inject()
  logger: LoggerService;

  @InjectRepository(User)
  private userRepository: Repository<User>;

  @InjectRepository(UserAuth)
  private userAuthRepository: Repository<UserAuth>;

  @InjectRepository(AuthLog)
  private authLogRepository: Repository<AuthLog>;


  async onModuleInit() {
    if (process.env.NODE_ENV !== 'production') {
      this.logger.debug('开发环境注入测试数据', AppModule.name);
      // await this.authLogRepository.delete([1,2,3]);
      // await this.userRepository.delete([1,2,3]);
      await this.userAuthRepository.clear();

      // eslint-disable-next-line
      const userFixtures: User[] = require('../fixtures/user.json');
      // userFixtures[0].userAuths = Promise.resolve([userAuthFixtures[0], userAuthFixtures[2]]);
      // userFixtures[1].userAuths = Promise.resolve([userAuthFixtures[1]]);
      await this.userRepository.save(userFixtures);

      // eslint-disable-next-line
      const userAuthFixtures: UserAuth = require('../fixtures/user-auth.json');
      userAuthFixtures[0].user = userFixtures[0];
      userAuthFixtures[1].user = userFixtures[1];
      userAuthFixtures[2].user = userFixtures[2];
      await this.userAuthRepository.save(userAuthFixtures);

      // eslint-disable-next-line
      const authLogFixtures: AuthLog = require('../fixtures/auth-log.json');
      await this.authLogRepository.save(authLogFixtures);
    }
  }
}
