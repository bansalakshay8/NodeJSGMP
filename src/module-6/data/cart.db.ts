import fs from 'fs';
import { Cart } from '../models/cart.model';

export function getAllCarts() {
    return new Promise((resolve, reject) => {
        fs.readFile('src/module-6/db/carts.txt', 'utf8', (err, data) => {
            if(err) {
                reject(err);
            }
            resolve(data);
        })
    })
}

export function updateUserCart(newCart: Array<Cart>) {
    return new Promise((resolve, reject) => {
        fs.writeFile('src/module-6/db/carts.txt', JSON.stringify(newCart), (err) => {
            if(err) {
                reject(err);
            }
            resolve("Cart Updated");
        })
    })
}
