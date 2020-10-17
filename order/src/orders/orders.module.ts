import { Module } from '@nestjs/common';
import { CommandHandlers } from './commands/handlers';
import { EventHandlers } from './events/handlers';
import { OrderProcessController } from './orders.controller';
import { QueryHandlers } from './queries/handlers';
import { OrderAgregateFactory } from './aggregate-factory/order.factory';
import { OrderProcessSagas } from './sagas/orders.sagas';
import { EventSourcingModule } from 'event-sourcing-nestjs';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderView, OrderViewSchema } from './view-schemas/order.schema';
import { ConfigModule } from '../config/config.module';
import { CommonModule } from '../common/common.module';
import { MicroservicesModule } from 'src/microservice-client/microservice-client.module';
import { StateUpdaters } from './events/updaters';
import { OrderViewRepository } from './view-repository/order-repository';
import { OrderViewService } from './order-view-services';

@Module({
  imports: [
    CqrsModule,
    EventSourcingModule.forFeature(),
    MongooseModule.forFeature([{ name: OrderView.name, schema: OrderViewSchema }]),
    ConfigModule,
    CommonModule,
    MicroservicesModule,
    
  ],
  controllers: [OrderProcessController],
  providers: [
    OrderAgregateFactory,
    OrderViewService,
    OrderViewRepository,
    ...CommandHandlers,
    ...EventHandlers,
    ...QueryHandlers,
    ...StateUpdaters,
    OrderProcessSagas,
    
    
  ],
})
export class OrderProcessModule {}
