import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import * as clc from 'cli-color';
import { OrderAgregateFactory } from '../../aggregate-factory/order.factory';
import { GetOrderQuery } from '../impl';

@QueryHandler(GetOrderQuery)
export class GetOrdersHandler implements IQueryHandler<GetOrderQuery> {
  constructor(private readonly repository: OrderAgregateFactory) {}

  async execute(query: GetOrderQuery) {
    console.log(clc.yellowBright('Async GetOrderQuery...'));
    return this.repository.findOneById(query.id);
  }
}
