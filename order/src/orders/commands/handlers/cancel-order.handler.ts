import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import * as clc from 'cli-color';
import { OrderAgregateFactory } from '../../aggregate-factory/order.factory';
import { CancelOrderCommand } from '../impl/cancel-order.command';
import { StoreEventPublisher } from 'event-sourcing-nestjs';
import { PaymentInfo, PaymentStatus } from 'src/orders/models/payment.model';
import { OrderState } from 'src/orders/models/order.model';

@CommandHandler(CancelOrderCommand)
export class CancelOrderHandler
  implements ICommandHandler<CancelOrderCommand> {
  constructor(
    private readonly factory: OrderAgregateFactory,
    private readonly publisher: StoreEventPublisher,
  ) {}

  async execute(command: CancelOrderCommand) {
    console.log(clc.yellowBright('Async CancelOrderCommand...'));

    const { id, reason, paymentInfoDto } = command;
    const order = this.publisher.mergeObjectContext(
      await this.factory.findOneById(id),
    );
    if (order && order.state == OrderState.Created) {
      const paymentInfo = new PaymentInfo();
      paymentInfo.id = paymentInfoDto.id;
      paymentInfo.createdDate = paymentInfoDto.createdDate;
      paymentInfo.status = PaymentStatus[paymentInfoDto.status as keyof typeof PaymentStatus];
    
      order.cancel(reason, paymentInfo);
      order.commit();
    }
    
  }
}
