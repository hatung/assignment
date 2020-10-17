export enum PaymentStatus {
    Created = 'CREATED',
    Canceled = 'CANCELED',
    Confirmed = 'CONFIRMED',
    Delivered = 'DELIVERED'
  }

export class PaymentInfo {
    public id: string;
    public status: PaymentStatus;
    public createdDate : Date;
}