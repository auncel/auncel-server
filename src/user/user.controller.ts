import { Controller, Get, Inject, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '../entity';
import { LoggerService } from '../logger/logger.service';

@Controller('/user')
export class UserController {
  @Inject()
  userService: UserService;

  @Inject()
  private logger: LoggerService;

  @Get('/:id')
  public async getInfo(@Param('id') userId: number): Promise<User> {
    this.logger.verbose(`userId ${typeof userId}`, UserController.name);
    const user = await this.userService.getInfo(userId);
    return user;
  }
}
