import { Injectable } from '@nestjs/common';
import { OrderViewRepository } from './view-repository/order-repository';
import { OrderView } from './view-schemas/order.schema';

@Injectable()
export class OrderViewService {
    constructor(
        private readonly repository: OrderViewRepository,
    ) {}

    async findOrders(): Promise<OrderView[]> {
        return this.repository.findAll();
    }
}