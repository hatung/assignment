import { Injectable } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import * as clc from 'cli-color';
import { Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { DeliverOrderCommand } from '../commands/impl/deliver-order.command';
import { OrderConfirmedEvent } from '../events/impl/order-confirmed.event';

@Injectable()
export class OrderProcessSagas {
  @Saga()
  dragonKilled = (events$: Observable<any>): Observable<ICommand> => {
    return events$
      .pipe(
        ofType(OrderConfirmedEvent),
        delay(1000),
        map(event => {
          console.log(clc.redBright('Inside [OrderProcessSagas] Saga'));
          return new DeliverOrderCommand(event.id);
        }),
      );
  }
}
