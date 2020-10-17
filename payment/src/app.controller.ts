import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { AppService } from './app.service';
import { v4 as uuidv4 } from 'uuid';
import * as clc from 'cli-color';
import { OrderClient } from './microservice-client/order-client';

@Controller()
export class AppController {
  constructor(
    private readonly orderClient: OrderClient,
    private readonly appService: AppService    
    ) {}

  @EventPattern('order-created')
  async handlePayment(data: Record<string, any>) {
    // business logic
    // execute command cancel order
    console.log(clc.bgCyanBright(' handlePayment..., order_id: ', data.id));

    const paymentComfirmedInfo = {
      id: uuidv4(),
      orderId: data.id,
      status: 'Confirmed',
      dateCreated: new Date(),
      signedData: ''
    };
    const paymentCanceledInfo = {
      id: uuidv4(),
      orderId: data.id,
      status: 'Canceled',
      dateCreated: new Date(),
      signedData: ''
    }
    const total : number = data.total;
    console.log('Client send mesage to order', total);
    
     if (total % 2 == 0 ) {
      this.orderClient.publish('payment_approved', paymentComfirmedInfo);
     } else {
      this.orderClient.publish('payment_declined', paymentCanceledInfo);
     }
  }
}

