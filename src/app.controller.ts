import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { User } from './Entity/user.entity';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello(): Promise<User[]> {
    const user = await this.appService.ormTest();
    console.log(user[0].userAuths);
    return user;
  }
}
