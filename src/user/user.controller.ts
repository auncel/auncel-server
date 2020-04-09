import { Controller, Get, Inject, Param, Session } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '../entity';
import { LoggerService } from '../logger/logger.service';

@Controller('/user')
export class UserController {
  @Inject()
  userService: UserService;

  @Inject()
  private logger: LoggerService;

  @Get('/')
  public index(@Session() session) {
    return session.userId;
  }

  @Get('/:id')
  public async getInfo(@Param('id') userId: number, @Session() session): Promise<User> {
    session.userId = 'userId';
    this.logger.verbose(`userId ${typeof userId}`, UserController.name);
    const user = await this.userService.getInfo(userId);
    return user;
  }
}
