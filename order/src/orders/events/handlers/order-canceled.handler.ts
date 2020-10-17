import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import * as clc from 'cli-color';
import { OrderCanceledEvent } from '../impl/order-canceled.event';

@EventsHandler(OrderCanceledEvent)
export class OrderCanceledHandler implements IEventHandler<OrderCanceledEvent> {
  handle(event: OrderCanceledEvent) {
    console.log(clc.yellowBright('Async OrderCanceledEvent...'));
  }
}
