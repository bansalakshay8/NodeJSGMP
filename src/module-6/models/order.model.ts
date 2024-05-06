import { CartItem } from "./cart.model";

export interface Order {
    id: string;
    userId: string;
    cartId: string;
    items: Array<CartItem>;
    total: number;
}
