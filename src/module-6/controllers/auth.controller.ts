import jsonwebtoken from 'jsonwebtoken';
import { createAccount, getUser } from "../services/auth.service.ts";
import bcrypt from "bcryptjs";

export const register = async (req, res, next) => {
    const reqBody = req.body;

    if (!(reqBody.email && reqBody.password && reqBody.first_name && reqBody.last_name)) {
        res.status(400)
        res.send("All input is required");
        return;
    }

    const user = await getUser(reqBody.email);

    if (user) {
        res.status(409);
        res.send("User Already Exist. Please Login");
        return;
    }

    const newUser = await createAccount(reqBody);

    if (newUser) {
        res.status(201);
        res.send("User successfully registered");
        return
    }

    res.status(500);
    res.send("Internal Server Error");
}

export const login = async (req, res, next) => {
    const { email, password } = req.body;

    if (!(email && password)) {
        res.status(400)
        res.send("All input is required");
        return;
    }

    const user = await getUser(email);

    if (!user) {
        res.status(404);
        res.send("No user with such email or password");
        return;
    }

    if (user && (await bcrypt.compare(password, user.password))) {
        const token = jsonwebtoken.sign(
            { user_id: user.id, email, role: user.role },
            "key",
            {
                expiresIn: "2h",
            }
        );

        res.status(200);
        res.json({ token });
        return;
    }
}