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
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToMany } from 'typeorm';
import { UserAuth } from './user-auth.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  private username: string;

  @Column()
  private realname: string;

  @Column()
  private avatar: string;

  @Column()
  private slogan: string;

  @Column()
  private role: number;

  @Column()
  private status: string;

  @CreateDateColumn({ type: 'datetime' })
  private registerTime: Date;

  @Column()
  private registerIp: string;

  @Column()
  private school: string;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // eslint-disable-next-line no-unused-vars
  @OneToMany(type => UserAuth, userAuth => userAuth.user)
  public userAuths: UserAuth[];
}
