import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { Order } from "./order.entity.ts";

@Entity()
export class User {
    @PrimaryColumn()
    id: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    role: string;

    @OneToMany(() => Order, order => order.user)
    order: Array<Order>;
}
