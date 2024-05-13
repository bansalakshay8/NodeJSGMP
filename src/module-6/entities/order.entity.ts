import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { User } from "./user.entity.ts";
import { Cart, CartItem } from "./cart.entity.ts";

@Entity()
export class Order {
    @PrimaryColumn()
    id: string;

    @ManyToOne(() => User)
    user: User;

    @ManyToOne(() => Cart)
    cart: Cart

    @OneToMany(() => CartItem, (cartItem) => cartItem.cart)
    cartItem: Array<CartItem>;

    @Column()
    total: number;
}
