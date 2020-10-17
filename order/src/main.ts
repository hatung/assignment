import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { ApplicationModule } from './app.module';
import { ConfigService } from './config/config.service';

const configService = new ConfigService('.env');
const msgBrokerHost = configService.get('MESSAGE_BROKER');

async function bootstrap() {
  const app = await NestFactory.create(ApplicationModule.forRoot());
  app.connectMicroservice({
      transport: Transport.RMQ,
      options: {
        urls: [msgBrokerHost],
        queue: 'orders_queue',
        queueOptions: {
          durable: false
        },
      },
  });

  await app.startAllMicroservicesAsync();
  await app.listen(3000);

}
bootstrap();