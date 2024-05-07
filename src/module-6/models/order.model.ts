import mongoose, { Schema } from "mongoose";
import { ICartItem } from "./cart.model";

export interface IOrder {
    id: string;
    userId: string;
    cartId: string;
    items: Array<ICartItem>;
    total: number;
}

const OrderSchema = new Schema({
    id: { type: String, required: true },
    userId: { type: String, required: true },
    cartId: { type: String, required: true },
    items: { type: Array<ICartItem>, required: true },
    total: { type: Number, required: true },
});

export default mongoose.model<IOrder>('Order', OrderSchema);