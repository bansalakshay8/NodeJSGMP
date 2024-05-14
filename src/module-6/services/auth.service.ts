import { createNewUser, getExistingUser } from '../data/auth.db.ts';
import bcrypt from "bcryptjs";

export async function getUser(email: string) {
    return await getExistingUser(email);
}

export async function createAccount(userDetails) {
    const encryptedPassword = await bcrypt.hash(userDetails.password, 10);
    const newUser = await createNewUser(userDetails, encryptedPassword);
    return newUser;
}