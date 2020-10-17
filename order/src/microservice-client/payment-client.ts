import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { PAYMENT_SERVICE } from '../common/constants';
@Injectable()
export class PaymentClient {
  constructor(
    @Inject(PAYMENT_SERVICE) private readonly client: ClientProxy,
  ) {}
  
  public publish(pattern: string, data: any) {
    this.client.emit(pattern, data);
  }
}