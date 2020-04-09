import { Injectable } from '@nestjs/common';

@Injectable()
export class ConfigService {
  public readonly REDIS_PORT = Number(process.env.REDIS_PORT || 6379);
  public readonly REDIS_HOST = process.env.REDIS_HOST || '49.234.72.82';
  public readonly SESSION_SECRET = process.env.SESSION_SECRET || 'p@ssw@rd';
}
