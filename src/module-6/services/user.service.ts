import { getUser } from "../data/user.db.ts";
import { IUser } from "../models/user.model.ts";

export async function findUser(userId: string) {
    const user: IUser = await getUser(userId);
    return user;
}
