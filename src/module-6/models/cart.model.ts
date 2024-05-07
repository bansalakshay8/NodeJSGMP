import mongoose, { Document, Schema } from "mongoose";
import { IProduct } from "./product.model";

export interface ICartItem extends Document {
    product: IProduct;
    count: number;
}

export interface ICart extends Document {
    id: string;
    userId: string;
    items: Array<ICartItem>;
    total: number;
}

const CartSchema = new Schema({
    id: { type: String, required: true },
    userId: { type: String, required: true },
    items: { type: Array<ICartItem>, required: true },
    total: { type: Number, required: true },
});

export default mongoose.model<ICart>('Cart', CartSchema);
