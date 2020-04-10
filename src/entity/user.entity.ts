/* --------------------------------------------------------------------------*
 * Description:                                                              *
 *                                                                           *
 * File Created: Friday, 3rd April 2020 8:28 pm                              *
 * Author: yidafu(dov-yih) (me@yidafu.dev)                                   *
 *                                                                           *
 * Last Modified: Friday, 3rd April 2020 8:28 pm                             *
 * Modified By: yidafu(dov-yih) (me@yidafu.dev>)                             *
 *                                                                           *
 * Copyright 2019 - 2020 Mozilla Public License 2.0                          *
 *-------------------------------------------------------------------------- */
import { Entity, Column, OneToMany } from 'typeorm';
import { UserAuth } from './user-auth.entity';
import { BaseEntity } from './base.entity';

@Entity()
export class User extends BaseEntity {
  @Column()
  public username: string;

  @Column()
  public realname: string;

  @Column()
  public avatar: string;

  @Column()
  public slogan: string;

  @Column()
  public role: number;

  @Column()
  public status: string;

  @Column()
  public registerIp: string;

  @Column()
  public school: string;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // eslint-disable-next-line no-unused-vars
  @OneToMany(type => UserAuth, userAuth => userAuth.user)
  public userAuths: UserAuth[];
}
