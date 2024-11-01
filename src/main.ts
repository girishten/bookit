import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { VersioningType } from '@nestjs/common';
import * as compression from 'compression';
import helmet from 'helmet';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.enableVersioning({
    type: VersioningType.URI,
  });

  app.use(compression());

  app.use(helmet());

  app.enableCors();

  const isCorsEnabled = configService.get('http.cors.enabled');
  const corsOrigin = configService.get('http.cors.origin');
  if (isCorsEnabled) {
    app.enableCors({
      origin: corsOrigin,
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      preflightContinue: false,
      optionsSuccessStatus: 204,
    });
  }

  const config = new DocumentBuilder()
    .setTitle('Bookit')
    .setDescription('The Bookit API description')
    .setVersion('1.0')
    .addTag('bookit')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, documentFactory);

  const applicationPort = +configService.get<string>('http.port');
  await app.listen(applicationPort);
}

bootstrap().then(() => {});
