/* --------------------------------------------------------------------------*
 * Description:                                                              *
 *                                                                           *
 * File Created: Friday, 10th April 2020 11:24 am                            *
 * Author: yidafu(dov-yih) (me@yidafu.dev)                                   *
 *                                                                           *
 * Last Modified: Friday, 10th April 2020 11:24 am                           *
 * Modified By: yidafu(dov-yih) (me@yidafu.dev>)                             *
 *                                                                           *
 * Copyright 2019 - 2020 Mozilla Public License 2.0                          *
 *-------------------------------------------------------------------------- */
import { Test, TestingModule } from '@nestjs/testing';
import {  PasswordBoxService } from './passwordbox.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import configuration from '../config/config'

describe('PasswordBox', () => {
  let service: PasswordBoxService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ PasswordBoxService],
      imports: [
        ConfigModule.forRoot({
        load: [configuration],
      }), ConfigModule],
    }).compile();

    service = module.get<PasswordBoxService>(PasswordBoxService);
  });

  it('密码应该是可还原的', () => {
    expect(service).toBeDefined();
    expect(service.decode(service.encode('password'))).toBe('password');
  });
});
