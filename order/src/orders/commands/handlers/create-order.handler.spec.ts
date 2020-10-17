import { mock, instance, when, anything } from 'ts-mockito';
import { CreateOrderHandler } from './create-order.handler';

import { StoreEventPublisher } from 'event-sourcing-nestjs';
import { CreateOrderCommand } from '../impl/create-order.command';
import { UidGenerator } from '../../../common/uid-generator';
import { Order, OrderState } from '../../models/order.model';

describe('CreateOrderHandler', () => {
    it('should emit OrderCreatedEvent', async () => {
        const uidGenerator = mock(UidGenerator);
        const eventpublisher = mock(StoreEventPublisher);
      
        const uid = '3a223661-7e67-478c-b3ac-c2b7cf297e35';
        const user_id = 'test';
        const total = 500;
        const state = OrderState.Created;
        const order = new Order(uid);

        when(uidGenerator.generate()).thenReturn(uid);
        when(eventpublisher.mergeObjectContext(anything() )).thenReturn(order);
        const createUserHandler = new CreateOrderHandler(
            instance(uidGenerator),
            instance(eventpublisher)
        );

        await createUserHandler.execute(new CreateOrderCommand(total, user_id));
        expect(order.state).toEqual(state);
        expect(order.total).toEqual(total);
    });
});
