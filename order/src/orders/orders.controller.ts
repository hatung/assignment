import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { EventPattern } from '@nestjs/microservices';
import { CancelOrderCommand } from './commands/impl/cancel-order.command';
import { ConfirmOrderCommand } from './commands/impl/confirm-order.command';
import { CreateOrderCommand } from './commands/impl/create-order.command';
import { CreateOrderDto } from './interfaces/create-order-dto.interface';
import { PaymentInfoDto } from './interfaces/payment-info-dto.interface';
import { Order } from './models/order.model';
import { OrderViewService } from './order-view-services';
import { GetOrderQuery } from './queries/impl';
import { OrderView } from './view-schemas/order.schema';

@Controller('order')
export class OrderProcessController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly orderviewService: OrderViewService,
  ) {}

  @Put('cancel')
  async cancelOrder(@Body() id: string) {
    const reason = "Canceled By User"
    return this.commandBus.execute(new CancelOrderCommand(id, reason, null));
  }
  @Post()
  async createOrder(@Body() dto: CreateOrderDto) {
    return this.commandBus.execute(new CreateOrderCommand(dto.total, dto.user_id));
  }

  @Get(':id')
  async find(@Param('id') id: string): Promise<Order> {
    return this.queryBus.execute(new GetOrderQuery(id));
  }
  @Get()
  async findAll(): Promise<OrderView[]> {
    return this.orderviewService.findOrders()
  }
  @EventPattern('payment_approved')
  async handlePaymentApproved(data: PaymentInfoDto) {
    // business logic
    //execute command confirm order
    return this.commandBus.execute(new ConfirmOrderCommand(data.orderId, data ));
  }
  @EventPattern('payment_declined')
  async handlePaymentDeclined(data: PaymentInfoDto) {
    // business logic
    // execute command decline order
    const reason = "Canceled by Payment Service"
    return this.commandBus.execute(new CancelOrderCommand(data.orderId, reason, data));

  }
}
