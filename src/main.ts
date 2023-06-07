import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as config from 'config';
import * as process from 'process';

async function bootstrap(server: any = config.get('server')) {
  const serverConfig = server;
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT || serverConfig.port);
}
bootstrap();
