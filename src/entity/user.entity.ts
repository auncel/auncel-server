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

  @Column({ nullable: true })
  public realname: string;

  @Column({ type: 'text' })
  public avatar: string;

  @Column({ nullable: true })
  public slogan: string;

  @Column({ default: 1 })
  public role: number;

  @Column({ default: 'active' })
  public status: string;

  @Column()
  public registerIp: string;

  @Column({ nullable: true })
  public school: string;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // eslint-disable-next-line no-unused-vars
  @OneToMany(() => UserAuth, userAuth => userAuth.user)
  public userAuths: UserAuth[];

  constructor(partial: Partial<User> = {}) {
    super();
    Object.assign(this, partial);
  }
}
