// Listen Domain Event and update view DB

import { IViewUpdater, ViewUpdaterHandler } from 'event-sourcing-nestjs';
import { OrderCreatedEvent } from '../impl/order-created.event';
import { OrderViewRepository } from '../../view-repository/order-repository';
import * as clc from 'cli-color';

@ViewUpdaterHandler(OrderCreatedEvent)
export class OrderCreatedUpdater implements IViewUpdater<OrderCreatedEvent> {

    constructor(
        private readonly repository: OrderViewRepository

    ) {
    }

    async handle(event: OrderCreatedEvent) {
        const { id, total, state, user_id } = event;
        console.log(clc.greenBright('View Update (OrderCreatedUpdater)...', id));

        await this.repository.insertOrder(id, total, state, user_id);
    }
}
