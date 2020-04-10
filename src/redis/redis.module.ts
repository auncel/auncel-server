import { DynamicModule } from '@nestjs/common';
import { RedisModule, RedisModuleOptions } from 'nestjs-redis';
import { ConfigModule, ConfigService } from '@nestjs/config';

export const Redis: DynamicModule = RedisModule.forRootAsync({
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (config: ConfigService): RedisModuleOptions => ({
    host: config.get<string>('redis.host', 'localhost'),
    port: config.get<number>('redis.port', 6379),
  }),
});
