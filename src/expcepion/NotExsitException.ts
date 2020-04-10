/* --------------------------------------------------------------------------*
 * Description:                                                              *
 *                                                                           *
 * File Created: Friday, 10th April 2020 7:39 pm                             *
 * Author: yidafu(dov-yih) (me@yidafu.dev)                                   *
 *                                                                           *
 * Last Modified: Friday, 10th April 2020 7:39 pm                            *
 * Modified By: yidafu(dov-yih) (me@yidafu.dev>)                             *
 *                                                                           *
 * Copyright 2019 - 2020 Mozilla Public License 2.0                          *
 *-------------------------------------------------------------------------- */

import { HttpException, HttpStatus } from '@nestjs/common';

export class NotExsitException extends HttpException {
  constructor() {
    super('user not exsit', HttpStatus.OK);
  }
}
