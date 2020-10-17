import { OrderCanceledUpdater } from "./order-canceled-updater";
import { OrderConfirmedUpdater } from "./order-confirmed-updater";
import { OrderCreatedUpdater } from "./order-created-updater";
import { OrderDeliveredUpdater } from "./order-delivered-updater";

export const StateUpdaters = [
    OrderCreatedUpdater,
    OrderCanceledUpdater,
    OrderConfirmedUpdater,
    OrderDeliveredUpdater,
];
