import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { ConfigService } from './config/config.service';

const configService = new ConfigService('.env');
const msgBrokerHost = configService.get('MESSAGE_BROKER');

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: [msgBrokerHost],
      queue: 'payments_queue',
      queueOptions: {
        durable: false
      },
    },
  });

  app.listen(() => console.log('Microservice Payment is listening'));
}
bootstrap();