// import fs from 'fs';
import Order, { IOrder } from '../models/order.model.ts';

export async function createOrder(order: IOrder) {
    return Order.create(order);

    // return new Promise((resolve, reject) => {
    //     fs.writeFile('src/module-6/db/orders.txt', JSON.stringify(order), (err) => {
    //         if(err) {
    //             reject(err);
    //         }
    //         resolve('Order Created');
    //     })
    // })
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
