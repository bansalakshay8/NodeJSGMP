import fs from 'fs';

export function getUsers(){
    return new Promise((resolve, reject) => {
        fs.readFile('src/module-6/db/users.txt', 'utf8', (err, data) => {
            if(err) {
                reject(err);
            }
            resolve(data);
        })
    })
}
