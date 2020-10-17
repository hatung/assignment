// Listen Domain Event and update view DB

import { IViewUpdater, ViewUpdaterHandler } from 'event-sourcing-nestjs';
import { OrderState } from 'src/orders/models/order.model';
import { OrderViewRepository } from '../../view-repository/order-repository';
import { OrderDeliveredEvent } from '../impl/order-deliver.event';

@ViewUpdaterHandler(OrderDeliveredEvent)
export class OrderDeliveredUpdater implements IViewUpdater<OrderDeliveredEvent> {

    constructor(
        private readonly repository: OrderViewRepository

    ) {
    }

    async handle(event: OrderDeliveredEvent) {
        const { id } = event;
        await this.repository.updateOrder(id, null, OrderState.Delivered);
    }
}
