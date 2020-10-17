// Listen Domain Event and update view DB

import { IViewUpdater, ViewUpdaterHandler } from 'event-sourcing-nestjs';
import { OrderState } from 'src/orders/models/order.model';
import { OrderViewRepository } from '../../view-repository/order-repository';
import { OrderCanceledEvent } from '../impl/order-canceled.event';

@ViewUpdaterHandler(OrderCanceledEvent)
export class OrderCanceledUpdater implements IViewUpdater<OrderCanceledEvent> {

    constructor(
        private readonly repository: OrderViewRepository

    ) {
    }

    async handle(event: OrderCanceledEvent) {
        const { id, canceledReason, paymentInfo } = event;
        await this.repository.updateOrder(id, null, OrderState.Canceled, canceledReason, paymentInfo ? paymentInfo.status : null );
    }
}
