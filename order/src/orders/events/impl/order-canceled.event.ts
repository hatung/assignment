import { StorableEvent } from 'event-sourcing-nestjs';
import { PaymentInfo } from 'src/orders/models/payment.model';

export class OrderCanceledEvent extends StorableEvent {

  eventAggregate = 'order';
  eventVersion = 1;

  constructor(
    public readonly id: string,
    public readonly canceledReason: string,
    public readonly paymentInfo: PaymentInfo,

    ) {
    super();
  }
}
