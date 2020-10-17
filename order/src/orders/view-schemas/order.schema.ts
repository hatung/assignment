import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type OrderViewDocument = OrderView & Document;

@Schema()
export class OrderView {
  
  @Prop()
  _id: string;
  @Prop()
  user_id: string;

  @Prop()
  total: number;

  @Prop()
  state: string;

  @Prop()
  cancel_reason: string;

  @Prop()
  payment_status: string;
}

export const OrderViewSchema = SchemaFactory.createForClass(OrderView);
