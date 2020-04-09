import * as ConnectRedis from 'connect-redis';
import * as session from 'express-session';
import { NestSessionOptions, SessionModule } from 'nestjs-session';
import { RedisService } from 'nestjs-redis';
import { ConfigService } from '../config/config.service';
import { ConfigModule } from '../config/config.module';
import { Redis } from '../redis/redis.module';

const RedisStore = ConnectRedis(session);

export const Session = SessionModule.forRootAsync({
  imports: [Redis, ConfigModule],
  inject: [RedisService, ConfigService],
  useFactory: (
    redisService: RedisService,
    config: ConfigService,
  ): NestSessionOptions => {
    const redisClient = redisService.getClient();
    const store = new RedisStore({ client: redisClient as any });
    return {
      session: {
        store,
        secret: config.SESSION_SECRET,
      },
    };
  },
});
