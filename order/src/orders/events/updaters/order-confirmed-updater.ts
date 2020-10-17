// Listen Domain Event and update view DB

import { IViewUpdater, ViewUpdaterHandler } from 'event-sourcing-nestjs';
import { OrderState } from 'src/orders/models/order.model';
import { OrderViewRepository } from '../../view-repository/order-repository';
import { OrderConfirmedEvent } from '../impl/order-confirmed.event';

@ViewUpdaterHandler(OrderConfirmedEvent)
export class OrderConfirmedUpdater implements IViewUpdater<OrderConfirmedEvent> {

    constructor(
        private readonly repository: OrderViewRepository

    ) {
    }

    async handle(event: OrderConfirmedEvent) {
        const { id, paymentInfo } = event;
        await this.repository.updateOrder(id, null, OrderState.Confirmed, null,  paymentInfo ? paymentInfo.status : null);
    }
}
