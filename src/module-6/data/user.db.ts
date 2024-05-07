// import fs from 'fs';
import User from '../models/user.model.ts';

export function getUser(userId: string) {
    // return new Promise((resolve, reject) => {
    //     fs.readFile('src/module-6/db/users.txt', 'utf8', (err, data) => {
    //         if(err) {
    //             reject(err);
    //         }
    //         resolve(data);
    //     })
    // })

    return User.findOne({ id: userId });
}
