import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoggerService } from '../logger/logger.service';
import { User } from '../entity/index';


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  @Inject()
  private logger: LoggerService;

  async getInfo(userId: number): Promise<User> {
    const user = await this.userRepository.findOne(userId);
    this.logger.debug(`got User: ${user}`, UserService.name);
    return user;
  }
}
