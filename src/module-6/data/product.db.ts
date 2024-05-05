import fs from 'fs';

export function getProducts() {
    return new Promise((resolve, reject) => {
        fs.readFile('src/module-6/db/products.txt', 'utf8', (err, data) => {
            if (err) {
                reject(err);
            }
            resolve(data);
        })
    })
}
