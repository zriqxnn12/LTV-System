import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import * as compression from 'compression';
import { AppModule } from './app.module';
import { Handler } from './cores/exceptions/handler.exception';
import { Response } from './cores/interceptions/response.interception';
import express = require('express');
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import path = require('path');

async function bootstrap() {
  // const app = await NestFactory.create(AppModule);
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const httpAdapter = app.get(HttpAdapterHost);

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(compression());
  app.useGlobalFilters(new Handler(httpAdapter));
  app.useGlobalInterceptors(new Response());
  app.enableCors({
    origin: (origin, callback) => {
      callback(null, true);
    },
  });

  // app.useStaticAssets(join(process.cwd(), 'uploads'), {
  //   prefix: '/uploads',
  // });

  await app.listen(3000);
}
bootstrap();
