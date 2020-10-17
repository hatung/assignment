import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import * as clc from 'cli-color';
import { OrderAgregateFactory } from '../../aggregate-factory/order.factory';
import {DeliverOrderCommand } from '../impl/deliver-order.command';
import { StoreEventPublisher } from 'event-sourcing-nestjs';

@CommandHandler(DeliverOrderCommand)
export class DeliverOrderHandler
  implements ICommandHandler<DeliverOrderCommand> {
  constructor(
    private readonly repository: OrderAgregateFactory,
    private readonly publisher: StoreEventPublisher,
  ) {}

  async execute(command:DeliverOrderCommand) {
    console.log(clc.yellowBright('AsyncDeliverOrderCommand...'));

    const { id } = command;
    const order = this.publisher.mergeObjectContext(
      await this.repository.findOneById(id),
    );
    order.deliver();
    order.commit();
  }
}
