import { mock, instance, when, verify, deepEqual, anything } from 'ts-mockito';
import { CancelOrderHandler } from './cancel-order.handler';
import { OrderAgregateFactory } from '../../aggregate-factory/order.factory';

import { StoreEventPublisher } from 'event-sourcing-nestjs';
import { Order, OrderState } from '../../models/order.model';
import { CancelOrderCommand } from '../impl/cancel-order.command';

describe('CancelOrderHandler', () => {
    it('should emit OrderCanceledEvent', async () => {
        const orderFactory = mock(OrderAgregateFactory);
        const eventpublisher = mock(StoreEventPublisher);
      
        const uid = '3a223661-7e67-478c-b3ac-c2b7cf297e35';
        const canceledState = OrderState.Canceled;
        const order = new Order(uid);
        order.state = OrderState.Created;

        when(orderFactory.findOneById(uid)).thenResolve(order);

        when(eventpublisher.mergeObjectContext( order )).thenReturn(order);
        const createUserHandler = new CancelOrderHandler(
            instance(orderFactory),
            instance(eventpublisher)
        );

        const response = await createUserHandler.execute(new CancelOrderCommand(uid));
        expect(order.state).toEqual(canceledState);
    });
});
