import { IEventHandler } from '@nestjs/cqrs';
import { EventsHandler } from '@nestjs/cqrs/dist/decorators/events-handler.decorator';
import * as clc from 'cli-color';
import { PaymentClient } from 'src/microservice-client/payment-client';
import { OrderCreatedEvent } from '../impl/order-created.event';

@EventsHandler(OrderCreatedEvent)
export class OrderCreatedHandler
  implements IEventHandler<OrderCreatedEvent> {
    constructor(
      private readonly paymentClient: PaymentClient,
     
    ) {}
  
  handle(event: OrderCreatedEvent) {
    console.log(clc.greenBright('OrderCreatedEvent...'));
    // send to microservice
    const data = event;
    console.log('Client send mesage to payment');
    this.paymentClient.publish('order-created', data);
  }
}
