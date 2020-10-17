import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CommonModule } from 'src/common/common.module';
import { ConfigModule } from 'src/config/config.module';
import { ConfigService } from 'src/config/config.service';
import { PAYMENT_SERVICE } from '../common/constants';
import { PaymentClient } from './payment-client';

const configService = new ConfigService('.env');
const msgBrokerHost = configService.get('MESSAGE_BROKER');
console.log('msgBrokerHost', msgBrokerHost)
@Module({
  imports: [
    ConfigModule,
    CommonModule,
    ClientsModule.register([
      {
        name: PAYMENT_SERVICE,
        transport: Transport.RMQ,
        options: {
            urls: [msgBrokerHost],
            queue: 'payments_queue',
            queueOptions: {
              durable: false
            },
          },
      },
    ]),
  ],
  controllers: [],
  providers: [PaymentClient],
  exports: [PaymentClient],
})
export class MicroservicesModule {}