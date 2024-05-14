import { Cart } from "../entities/cart.entity.ts";
import { User } from "../entities/user.entity.ts";
import { AppDataSource } from "../server_rdbms.ts";
import { v4 as uuidv4 } from 'uuid';

export function getExistingUser(email: string) {
    const userRepository = AppDataSource.getRepository(User);
    return userRepository.findOneBy({ email: email });
}

export async function createNewUser(userDetails, encryptedPassword) {
    try {
        const userRepository = AppDataSource.getRepository(User);
        const cartRepository = AppDataSource.getRepository(Cart);
        const newUser = new User();
        newUser.id = uuidv4();
        newUser.firstName = userDetails.first_name;
        newUser.lastName = userDetails.last_name;
        newUser.email = userDetails.email;
        newUser.password = encryptedPassword;
        newUser.role = userDetails.role;
        await userRepository.save(newUser);

        const newCart = new Cart();
        newCart.id = uuidv4();
        newCart.total = 0;
        newCart.user = newUser;

        await cartRepository.save(newCart);
        return newUser;
    }
    catch {
        throw new Error("User Creation Failed");
    }
}   