import { OrderCanceledEvent } from '../events/impl/order-canceled.event';
import { OrderCreatedEvent } from '../events/impl/order-created.event';
import { AggregateRoot } from '@nestjs/cqrs';
import { PaymentInfo } from './payment.model';
import { OrderConfirmedEvent } from '../events/impl/order-confirmed.event';
import { OrderDeliveredEvent } from '../events/impl/order-deliver.event';

export enum OrderState {
  Created = 'created',
  Canceled = 'canceled',
  Confirmed = 'confirmed',
  Delivered = 'delivered'
}

export class Order extends AggregateRoot {

  public readonly id: string;

  public state: OrderState;
  public total: number;
  public user_id: string;
  public cancelReason: string;
  public paymentInfo: PaymentInfo;

  public items: string[] = [];

  constructor(id: string) {
    super();
    this.id = id;
  }

  create(total: number, user_id : string) {
    this.apply(new OrderCreatedEvent(this.id, total, user_id, OrderState.Created));
  }

  cancel(reason, paymentInfo) {
    this.apply(new OrderCanceledEvent(this.id, reason, paymentInfo));
  }
  deliver() {
    this.apply(new OrderDeliveredEvent(this.id));
  }
  
  confirm (payment : PaymentInfo) {
    this.apply(new OrderConfirmedEvent(this.id, payment));
  }
 
  // *** Replay event from history ***
  onOrderCreatedEvent(event: OrderCreatedEvent) {    
    this.total = event.total;
    this.user_id = event.user_id;
    this.state = event.state;
  }

  onOrderCanceledEvent(event: OrderCanceledEvent) {
    this.state = OrderState.Canceled;
    this.cancelReason = event.canceledReason;
    this.paymentInfo = event.paymentInfo;
  }
  
  onOrderConfirmedEvent(event: OrderConfirmedEvent) {
    this.state = OrderState.Confirmed;
    this.paymentInfo = event.paymentInfo;
  }
}
