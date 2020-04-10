/* --------------------------------------------------------------------------*
 * Description:                                                              *
 *                                                                           *
 * File Created: Friday, 10th April 2020 11:04 am                            *
 * Author: yidafu(dov-yih) (me@yidafu.dev)                                   *
 *                                                                           *
 * Last Modified: Friday, 10th April 2020 11:04 am                           *
 * Modified By: yidafu(dov-yih) (me@yidafu.dev>)                             *
 *                                                                           *
 * Copyright 2019 - 2020 Mozilla Public License 2.0                          *
 *-------------------------------------------------------------------------- */
export default () => ({
  redis: {
    port: Number(process.env.REDIS_PORT || 6379),
    host: process.env.REDIS_HOST || '49.234.72.82',
  },
  session: {
    secret: process.env.SESSION_SECRET || 'p@ssw@rd',
  },
  aes: {
    // initialization vector
    iv: '15161718191a1b1c1d1e1f2021222324',
    key: '0002080d0d0f0d06030e0a0c0a040b070d0b0e050b0f0f0f030e020b0c060a00',
  },
});
