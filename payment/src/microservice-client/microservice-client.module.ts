import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule } from 'src/config/config.module';
import { ConfigService } from 'src/config/config.service';
import { ORDER_SERVICE } from '../common/constants';
import { OrderClient } from './order-client';

const configService = new ConfigService('.env');
const msgBrokerHost = configService.get('MESSAGE_BROKER');
console.log('msgBrokerHost', msgBrokerHost)
@Module({
  imports: [
    ConfigModule,
    ClientsModule.register([
      {
        name: ORDER_SERVICE,
        transport: Transport.RMQ,
        options: {
            urls: [msgBrokerHost],
            queue: 'orders_queue',
            queueOptions: {
              durable: false
            },
          },
      },
    ]),
  ],
  controllers: [],
  providers: [OrderClient],
  exports: [OrderClient],
})
export class MicroservicesModule {}