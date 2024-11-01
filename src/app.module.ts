import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import envConfiguration from './config/env.configuration';
import { TypeOrmModule } from '@nestjs/typeorm';
import dbConfiguration from './config/db.configuration';
import { EventEmitterModule } from '@nestjs/event-emitter';
import eventConfiguration from './config/event.configuration';
import { HttpModule } from '@nestjs/axios';
import httpConfiguration from './config/http.configuration';
import { ThrottlerModule } from '@nestjs/throttler';
import throttleConfiguration from './config/throttle.configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      load: [envConfiguration],
      // validate: envValidation,
      // validationOptions: {
      //   allowUnknown: false,
      //   abortEarly: true,
      // },
    }),
    // postgres database
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: dbConfiguration,
      inject: [ConfigService],
    }),
    // Event Emitter
    EventEmitterModule.forRoot(eventConfiguration()),
    // Axios HTTP configuration
    HttpModule.registerAsync({
      imports: [ConfigModule],
      useFactory: httpConfiguration,
      inject: [ConfigService],
    }),
    ThrottlerModule.forRoot(throttleConfiguration()),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
