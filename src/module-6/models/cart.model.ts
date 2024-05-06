import { Product } from "./product.model";

export interface CartItem {
    product: Product;
    count: number;
}

export interface Cart {
    id: string;
    userId: string;
    items: Array<CartItem>;
    total: number;
}
