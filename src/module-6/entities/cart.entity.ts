import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryColumn } from "typeorm";
import { Product } from "./product.entity.ts";
import { User } from "./user.entity.ts";
import { Order } from "./order.entity.ts";

@Entity()
export class CartItem {
    @PrimaryColumn()
    id: string;

    @ManyToOne(() => Product)
    product: Product;

    @Column()
    count: number;

    @ManyToOne(() => Cart)
    cart: Cart;
}

@Entity()
export class Cart {
    @PrimaryColumn()
    id: string;

    @OneToOne(() => User)
    @JoinColumn()
    user: User;

    @OneToMany(() => CartItem, (cartItem) => cartItem.cart)
    cartItem: Array<CartItem>;

    @Column()
    total: number;

    @OneToMany(() => Order, order => order.cart)
    order: Array<Order>
}
