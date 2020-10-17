import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import * as clc from 'cli-color';
import { OrderAgregateFactory } from '../../aggregate-factory/order.factory';
import { ConfirmOrderCommand } from '../impl/confirm-order.command';
import { StoreEventPublisher } from 'event-sourcing-nestjs';
import { PaymentInfo, PaymentStatus } from 'src/orders/models/payment.model';

@CommandHandler(ConfirmOrderCommand)
export class ConfirmOrderHandler implements ICommandHandler<ConfirmOrderCommand> {
  constructor(
    private readonly repository: OrderAgregateFactory,
    private readonly publisher: StoreEventPublisher,
  ) {}

  async execute(command: ConfirmOrderCommand) {
    console.log(clc.greenBright('ConfirmOrderCommand...'));

    const {id, paymentInfoDto } = command;

    const order = this.publisher.mergeObjectContext(
      await this.repository.findOneById(id)
    );
    // maping DTO to model
    if (order) {
      const paymentInfo = new PaymentInfo();
      paymentInfo.id = paymentInfoDto.id;
      paymentInfo.createdDate = paymentInfoDto.createdDate;
      paymentInfo.status = PaymentStatus[paymentInfoDto.status as keyof typeof PaymentStatus];
      order.confirm(paymentInfo);
      order.commit();
    }
  }
}
