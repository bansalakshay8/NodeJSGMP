// import fs from 'fs';
import { Cart } from '../entities/cart.entity.ts';
import { Order } from '../entities/order.entity.ts';
import { v4 as uuidv4 } from 'uuid';
import { AppDataSource } from '../server_rdbms.ts';

export async function createOrder(cart: Cart) {
    const orderRepository = AppDataSource.getRepository(Order);
    const cartRepository = AppDataSource.getRepository(Cart);
    const userCart = await cartRepository.findOneBy({ id: cart.id });
    const order = new Order();
    order.id = uuidv4();
    order.user = userCart.user;
    order.cart = userCart;
    order.cartItem = userCart.cartItem;
    order.total = userCart.total;
    await orderRepository.save(order);
    userCart.cartItem = [];
    userCart.total = 0;
    return cartRepository.save(userCart);
}

// export async function getOrders() {
//     return new Promise((resolve, reject) => {
//         fs.readFile('src/module-6/db/orders.txt', (err, data) => {
//             if(err) {
//                 reject(err);
//             }
//             resolve(data);
//         })
//     })
// }
