import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as aesjs from 'aes-js';
import { RegisterDto } from '../dto/RegisterDto';
import { User, UserAuth } from '../entity';
import { LoggerService } from '../logger/logger.service';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const Identicon = require('identicon.js');

@Injectable()
export class RegisterService {
  @Inject()
  loggger: LoggerService;

  @InjectRepository(User)
  private userRepository: Repository<User>;

  @InjectRepository(UserAuth)
  private userAuthRepository: Repository<UserAuth>;

  async exsit(username: string): Promise<boolean> {
    const user = await this.userRepository.findOne({
      where: { username },
    });
    this.loggger.log(`用户是否存在: ${!!user}`, RegisterService.name);
    return !!user;
  }

  async createUser(registerDto: RegisterDto): Promise<User> {
    const user = new User();
    user.username = registerDto.username;
    user.avatar = this.genertateAvatar(registerDto.username);
    user.registerIp = registerDto.registerIp;

    const userAuth = new UserAuth({
      identityType: 'email',
      identifier: registerDto.email,
      credential: registerDto.password,
      user,
    });

    await this.userRepository.save(user);
    const savedUserAuth = await this.userAuthRepository.save(userAuth);
    this.loggger.log(`保存用户成功: ${savedUserAuth}`, RegisterService.name);
    return user;
  }

  genertateAvatar(str: string): string {
    const hex = aesjs.utils.hex.fromBytes(aesjs.utils.utf8.toBytes(str));
    console.log(hex.padStart(15, '0'));
    const base64 = new Identicon(hex.padStart(15, '0'), 40);
    return `data:image/png;base64,${base64}`;
  }
}
