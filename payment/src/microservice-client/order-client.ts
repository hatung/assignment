import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ORDER_SERVICE } from '../common/constants';
@Injectable()
export class OrderClient {
  constructor(
    @Inject(ORDER_SERVICE) private readonly client: ClientProxy,
  ) {}
  
  public publish(pattern: string, data: any) {
    this.client.emit(pattern, data);
  }
}