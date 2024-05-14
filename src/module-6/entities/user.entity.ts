import { Entity, JoinColumn, OneToMany, OneToOne, PrimaryColumn } from "typeorm";
import { Order } from "./order.entity.ts";
import { Cart } from "./cart.entity.ts";

@Entity()
export class User {
    @PrimaryColumn()
    id: string;

    @OneToMany(() => Order, order => order.user)
    order: Array<Order>
}
