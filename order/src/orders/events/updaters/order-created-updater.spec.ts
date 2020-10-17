import { mock, instance, verify } from 'ts-mockito';
import { OrderCreatedUpdater } from './order-created-updater';
import { OrderCreatedEvent } from '../impl/order-created.event';
import { OrderViewRepository } from '../../view-repository/order-repository';
import { OrderState } from '../../models/order.model';

describe('OrderCreatedUpdater', () => {
    it('should update view DB', async () => {
        const repository = mock(OrderViewRepository) 

        const uid = '3a223661-7e67-478c-b3ac-c2b7cf297e35';
        const user_id = 'test';
        const total = 500;
        const state = OrderState.Created;

         await new OrderCreatedUpdater(instance(repository)).handle(
            new OrderCreatedEvent(uid, total, user_id, state),
        );

        verify(repository.insertOrder(uid, total, state, user_id )).once();
    });
});
