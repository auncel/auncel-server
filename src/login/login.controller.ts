import { Controller, Get, Body, Inject, Session, Post, BadRequestException, Request } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoginParamDto } from '../dto/LoginParamDto';
import { LoginService } from './login.service';
import { PasswordBoxService } from './passwordbox.service';
import { LoggerService } from '../logger/logger.service';
import { AuthLog } from '../entity';

@Controller('login')
export class LoginController {
  @Inject()
  logger: LoggerService;

  @Inject()
  loginService: LoginService;

  @Inject()
  passwordBox: PasswordBoxService;


  @InjectRepository(AuthLog)
  private authLogRepository: Repository<AuthLog>;


  @Get('/key')
  public getKey(@Session() session): { key: string; pwd?: string } {
    const key = this.passwordBox.genKey();
    session.aesKey = key;
    if (process.env.NODE_ENV !== 'production') {
      this.passwordBox.setKey(key);
      return {
        key,
        pwd: this.passwordBox.encode('password'),
      };
    }
    return { key };
  }

  @Post('/')
  public async index(@Body() loginParamDto: LoginParamDto, @Session() session, @Request() req) {
    const result: any = {};
    const aesKey = session.aesKey;
    this.logger.log(`Session key${session.aesKey}: `, LoginController.name);
    // 重置 key
    session.aesKey = '';

    if (!aesKey) {
      throw new BadRequestException('请刷新页面重试');
    }
    if (loginParamDto.type === 'email') {
      const loginUser = await this.loginService.email(
        loginParamDto.email,
        loginParamDto.password,
        aesKey,
      );
      if (loginUser) {
        this.logger.log(`user success login: ${loginUser}`, LoginController.name);
        result.redirectUrl = `/u/${loginUser.username}`;
        const log = new AuthLog();
        log.title = '正常登录';
        log.content = `用户 ${loginUser.username} ${new Date()} 登录通过邮箱登录，ip: ${req.ip}`;
        log.loginIp = req.ip;
        this.authLogRepository.create(log);
      } else {
        throw new BadRequestException('请确认邮箱或密码后重试');
      }
    }
    return result;
  }
}
