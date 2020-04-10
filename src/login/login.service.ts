import { Injectable, Inject, ForbiddenException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { User, UserAuth } from '../entity';
import { LoggerService } from '../logger/logger.service';
import { PasswordBoxService } from './passwordbox.service';


@Injectable()
export class LoginService {
  @Inject()
  logger: LoggerService;

  @Inject()
  passwordBox: PasswordBoxService;

  @Inject()
  config: ConfigService;

  @InjectRepository(User)
  private userRepository: Repository<User>;

  @InjectRepository(UserAuth)
  private userAuthRepository: Repository<UserAuth>;

  public async email(email: string, password: string, key: string): Promise<User | null> {
    const userAuthRecod = await this.userAuthRepository.findOne({
      where: [
        { identityType: 'email' },
        { identifier: email },
      ],
    });
    this.logger.log(`userAuthRecod: ${userAuthRecod}`, LoggerService.name);

    if (userAuthRecod) {
      const expectPwd = userAuthRecod.credential;
      this.passwordBox.setKey(this.config.get<string>('aes.key'));
      const decodeExcpetPwd = this.passwordBox.decode(expectPwd);
      this.passwordBox.setKey(key);
      const decodeActaulPasswd = this.passwordBox.decode(password);
      this.logger.verbose(`用户输入的密码: ${decodeActaulPasswd}, 数据库里的密码: ${decodeExcpetPwd}`);
      if (decodeActaulPasswd === decodeExcpetPwd) {
        // eslint-disable-next-line no-return-await
        return userAuthRecod.user;
      }
      throw new ForbiddenException('登录失败，请重新确认账号或秘密');
    }
    return null;
  }
}
