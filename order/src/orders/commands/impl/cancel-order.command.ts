import { PaymentInfoDto } from "src/orders/interfaces/payment-info-dto.interface";

export class CancelOrderCommand {
  constructor(
    public readonly id: string,
    public readonly reason: string,
    public readonly paymentInfoDto: PaymentInfoDto,
    ) {}
}
