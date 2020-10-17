import { Injectable } from '@nestjs/common';
import { Order } from '../models/order.model';
import { EventStore } from 'event-sourcing-nestjs';

@Injectable()
export class OrderAgregateFactory {

  constructor(
    private readonly eventStore: EventStore,
  ) {}

  async findOneById(id: string): Promise<Order> {
    const order = new Order(id);
    order.loadFromHistory(await this.eventStore.getEvents('order', id));
    return order;
  }
}
