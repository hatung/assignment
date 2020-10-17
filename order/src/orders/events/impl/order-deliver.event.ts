import { StorableEvent } from 'event-sourcing-nestjs';

export class OrderDeliveredEvent extends StorableEvent {

  eventAggregate = 'order';
  eventVersion = 1;

  constructor(public readonly id: string) {
    super();
  }
}
