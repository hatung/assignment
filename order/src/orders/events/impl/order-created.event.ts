import { StorableEvent } from 'event-sourcing-nestjs';
import { OrderState } from '../../models/order.model';

export class OrderCreatedEvent extends StorableEvent {

  eventAggregate = 'order';
  eventVersion = 1;
  
  constructor(
    public readonly id: string,
    public readonly total: number,
    public readonly user_id: string,
    public readonly state: OrderState,

  ) {
    super();
  }
}
