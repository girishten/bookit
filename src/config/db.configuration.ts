import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export default (configService: ConfigService): TypeOrmModuleOptions => {
  return {
    type: 'postgres',
    host: configService.get('db.postgres.url'),
    port: +configService.get('db.postgres.port'),
    database: configService.get('db.postgres.database'),
    username: configService.get('db.postgres.username'),
    password: configService.get('db.postgres.password'),
    schema: configService.get('db.postgres.schema'),
    synchronize: configService.get('db.postgres.synchronize'),
    autoLoadEntities: true,
  };
};
