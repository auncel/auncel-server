/* --------------------------------------------------------------------------*
 * Description:                                                              *
 *                                                                           *
 * File Created: Thursday, 9th April 2020 2:32 pm                            *
 * Author: yidafu(dov-yih) (me@yidafu.dev)                                   *
 *                                                                           *
 * Last Modified: Thursday, 9th April 2020 2:52 pm                           *
 * Modified By: yidafu(dov-yih) (me@yidafu.dev>)                             *
 *                                                                           *
 * Copyright 2019 - 2020 Mozilla Public License 2.0                          *
 *-------------------------------------------------------------------------- */

import * as aesjs from 'aes-js';
import { Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PasswordBoxService {
  @Inject()
  config: ConfigService;

  // eslint-disable-next-line new-cap
  private key = '';

  private aesCtr: aesjs.ModeOfOperation.ModeOfOperationCBC;

  public genKey(): string {
    // eslint-disable-next-line no-bitwise
    const bitKey256 = Array(32).fill(1).map(() => (Math.random() * 16 | 0));
    return aesjs.utils.hex.fromBytes(bitKey256);
  }

  // eslint-disable-next-line class-methods-use-this
  get iv(): Uint8Array {
    const iv = this.config.get<string>('aes.iv');
    return aesjs.utils.hex.toBytes(iv);
  }

  public getKey(): string {
    return this.key || this.config.get<string>('aes.key');
  }

  public setKey(key: string): void {
    this.key = key;
  }

  public encode(password: string): string {
    const bitKey = aesjs.utils.hex.toBytes(this.getKey());
    const bitPassword = aesjs.utils.utf8.toBytes(password);
    // eslint-disable-next-line new-cap
    this.aesCtr = new aesjs.ModeOfOperation.ctr(bitKey);
    const encryptedBytes = this.aesCtr.encrypt((bitPassword));
    const encryptedPassword = aesjs.utils.hex.fromBytes(encryptedBytes);
    return encryptedPassword;
  }

  public decode(encryptedPassword: string): string {
    const bitKey = aesjs.utils.hex.toBytes(this.getKey());
    const bitEncryptedPassword = aesjs.utils.hex.toBytes(encryptedPassword);
    // eslint-disable-next-line new-cap
    this.aesCtr = new aesjs.ModeOfOperation.ctr(bitKey);
    const decryptedBytes = this.aesCtr.decrypt((bitEncryptedPassword));
    const password = aesjs.utils.utf8.fromBytes(decryptedBytes);
    return password;
  }
}
