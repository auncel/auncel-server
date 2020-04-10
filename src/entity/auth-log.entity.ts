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
import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity()
export class AuthLog extends BaseEntity {
  @Column()
  public loginIp: string;

  @Column()
  public title: string;

  @Column()
  public content: string;
}
