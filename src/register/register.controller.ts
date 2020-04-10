import { Controller, Post, Body, Inject, Session, Request } from '@nestjs/common';
import { RegisterDto } from 'src/dto/RegisterDto';
import { LoggerService } from '../logger/logger.service';
import { RegisterService } from './register.service';
import { NotExsitException } from '../expcepion/NotExsitException';

@Controller('/register')
export class RegisterController {
  @Inject()
  logger: LoggerService;

  @Inject()
  registerService: RegisterService;


  @Post('/')
  public async register(@Body() registerDto: RegisterDto, @Session() session, @Request() req) {
    const exsit = await this.registerService.exsit(registerDto.username);
    if (!exsit) {
      registerDto.registerIp = req.ip;
      const user = await this.registerService.createUser(registerDto);
      session.user = user;
      session.isLogin = true;
      return { redirectUrl: `/u/${user.username}` };
    }
    throw new NotExsitException();
  }
}
