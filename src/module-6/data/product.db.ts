// import fs from 'fs';
import Product from '../models/product.model.ts';

export function getProducts() {
    // return new Promise((resolve, reject) => {
    //     fs.readFile('src/module-6/db/products.txt', 'utf8', (err, data) => {
    //         if (err) {
    //             reject(err);
    //         }
    //         resolve(data);
    //     })
    // })

    return Product.find();
}

export function getSingleProduct(productId: string) {
    return Product.findOne({ id: productId });
}
