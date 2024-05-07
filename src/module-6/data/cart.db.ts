// import fs from 'fs';
import Cart, { ICart } from '../models/cart.model.ts';

export function getCart(userId: string) {
    return Cart.findOne({ userId: userId });
}

// export function getAllCarts() {
//     return new Promise((resolve, reject) => {
//         fs.readFile('src/module-6/db/carts.txt', 'utf8', (err, data) => {
//             if(err) {
//                 reject(err);
//             }
//             resolve(data);
//         })
//     })
// }

export function updateUserCart(userCart: ICart) {
    return Cart.updateOne({ userId: userCart.userId }, { items: userCart.items, total: userCart.total });

    // return new Promise((resolve, reject) => {
    //     fs.writeFile('src/module-6/db/carts.txt', JSON.stringify(newCart), (err) => {
    //         if(err) {
    //             reject(err);
    //         }
    //         resolve("Cart Updated");
    //     })
    // })
}

export function createCart(userCart: ICart) {
    return Cart.create(userCart);
}
