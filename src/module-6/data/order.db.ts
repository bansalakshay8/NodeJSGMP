import fs from 'fs';
import { Order } from '../models/order.model';

export async function createOrder(order: Array<Order>) {
    return new Promise((resolve, reject) => {
        fs.writeFile('src/module-6/db/orders.txt', JSON.stringify(order), (err) => {
            if(err) {
                reject(err);
            }
            resolve('Order Created');
        })
    })
} 

export async function getOrders() {
    return new Promise((resolve, reject) => {
        fs.readFile('src/module-6/db/orders.txt', (err, data) => {
            if(err) {
                reject(err);
            }
            resolve(data);
        })
    })
}
