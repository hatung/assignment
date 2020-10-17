import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import * as clc from 'cli-color';
import { CreateOrderCommand } from '../impl/create-order.command';
import { StoreEventPublisher } from 'event-sourcing-nestjs';
import { Order } from '../../models/order.model';
import { UidGenerator } from '../../../common/uid-generator';

@CommandHandler(CreateOrderCommand)
export class CreateOrderHandler implements ICommandHandler<CreateOrderCommand> {
  constructor(
    private readonly uid: UidGenerator,
    private readonly publisher: StoreEventPublisher,
  ) {}

  async execute(command: CreateOrderCommand) {
    console.log(clc.greenBright('CreateOrderCommand...'));

    const { total, user_id } = command;
    const id = this.uid.generate();

    const order = this.publisher.mergeObjectContext(
      new Order(id),
    );
    order.create(total, user_id);
    order.commit();
  }
}
