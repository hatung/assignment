import { OrderCreatedHandler } from './order-created.handler';
import { OrderCanceledHandler } from './order-canceled.handler';

export const EventHandlers = [
    OrderCreatedHandler,
    OrderCanceledHandler,
];
