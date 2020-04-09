import { Module, OnModuleInit, Inject } from '@nestjs/common';
import { TypeOrmModule, InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { LoggerModule } from './logger/logger.module';
import { ConfigModule } from './config/config.module';
import { Session } from './session/session.module';
import { LoggerService } from './logger/logger.service';
import { User, UserAuth, AuthLog } from './entity';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    LoggerModule,
    UserModule,
    ConfigModule,
    Session,
    TypeOrmModule.forFeature([User, UserAuth, AuthLog]),
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
      await this.userRepository.save(userFixtures);

      // eslint-disable-next-line
      const userAuthFixtures: UserAuth = require('../fixtures/user-auth.json');
      await this.userAuthRepository.save(userAuthFixtures);

      // eslint-disable-next-line
      const authLogFixtures: AuthLog = require('../fixtures/auth-log.json');
      await this.authLogRepository.save(authLogFixtures);
    }
  }
}
