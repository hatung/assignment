import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OrderViewDocument } from '../view-schemas/order.schema';

@Injectable()
export class OrderViewRepository {
    constructor(
    @InjectModel('OrderView') private readonly orderModel: Model<OrderViewDocument>,
    ) { }

  async findOneById(id: string): Promise<OrderViewDocument> {
    let order;
    console.log( 'orderId', id);
    try {
        order = await this.orderModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Could not find Order.');
    }
    if (!order) {
      throw new NotFoundException('Could not find Order.');
    }
    return order;
  }

  async findAll(): Promise<OrderViewDocument[]> {
    
    const orders = await this.orderModel.find().exec();
    return orders.map(order => ({
      id: order.id,
      user_id: order.user_id,
      total: order.total,
      status: order.state,
      reason: order.cancel_reason,
      payment_status: order.payment_status,
      
    }));

  }
  async updateOrder(
    orderId: string,
    total: number = null,
    state: string = null,
    cancel_reason: string = null,
    payment_status: string = null,
  ) {
    const updatedOrder = await this.findOneById(orderId);
    if (total) {
      updatedOrder.total = total;
    }
    if (state) {
      updatedOrder.state = state;
    }
    if (cancel_reason) {
      updatedOrder.cancel_reason = cancel_reason;
    }    
    if (payment_status) {
      updatedOrder.payment_status = payment_status;
    }
    updatedOrder.save();
  }
  async insertOrder(id: string, total: number, state: string, user_id: string) {
    const neworder = {total, state,  user_id};
    const result = await this.orderModel.findOneAndUpdate({_id : id},neworder, {
      new: true,
      upsert: true
    }  );
    return result.id as string;
  }
}
