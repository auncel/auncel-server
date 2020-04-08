/* --------------------------------------------------------------------------*
 * Description:                                                              *
 *                                                                           *
 * File Created: Wednesday, 8th April 2020 3:08 pm                           *
 * Author: yidafu(dov-yih) (me@yidafu.dev)                                   *
 *                                                                           *
 * Last Modified: Wednesday, 8th April 2020 3:08 pm                          *
 * Modified By: yidafu(dov-yih) (me@yidafu.dev>)                             *
 *                                                                           *
 * Copyright 2019 - 2020 Mozilla Public License 2.0                          *
 *-------------------------------------------------------------------------- */

import { CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn } from 'typeorm';

export class BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ type: 'datetime' })
  private createdAt: Date;

  @UpdateDateColumn({ type: 'datetime' })
  private updatedAt: Date;

  toString() {
    return `${Object.keys(this)
      .reduce(
        (acc, curr) => `${acc} ${curr}: ${this[curr]},`,
        `${this.constructor.name} {`,
      )}}`;
  }
}
