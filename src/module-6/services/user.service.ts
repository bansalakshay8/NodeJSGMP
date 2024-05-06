import { getUsers } from "../data/user.db.ts";
import { User } from "../models/user.model.ts";

export async function findUser(userId: string) {
    const users = await getUsers() as string;
    return JSON.parse(users).find((user: User) => user.id === userId);
}
