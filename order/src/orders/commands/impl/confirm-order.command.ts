import { PaymentInfoDto } from "src/orders/interfaces/payment-info-dto.interface";

export class ConfirmOrderCommand {
    constructor(
        public readonly id: string,
        public readonly paymentInfoDto: PaymentInfoDto,
      
    ) {}
  }
  