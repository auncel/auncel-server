/* --------------------------------------------------------------------------*
 * Description:                                                              *
 *                                                                           *
 * File Created: Friday, 3rd April 2020 9:28 pm                              *
 * Author: yidafu(dov-yih) (me@yidafu.dev)                                   *
 *                                                                           *
 * Last Modified: Friday, 3rd April 2020 9:28 pm                             *
 * Modified By: yidafu(dov-yih) (me@yidafu.dev>)                             *
 *                                                                           *
 * Copyright 2019 - 2020 Mozilla Public License 2.0                          *
 *-------------------------------------------------------------------------- */
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class AuthLog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  private loginIp: string;

  @Column()
  private title: string;

  @Column()
  private content: string;
}
