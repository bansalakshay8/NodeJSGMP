import Joi from "joi";
import jsonwebtoken from 'jsonwebtoken';
// import { findUser } from "./services/user.service.ts";
// import { IUser } from "./models/user.model.ts";


const productReqBodySchema = Joi.object({
    productId: Joi.string().required(),
    count: Joi.number().required(),
});

const orderReqBodySchema = Joi.object({
    id: Joi.string().required(),
    total: Joi.number().required(),
})

export const userValidation = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        res.status(401);
        res.send("Token is required");
        return;
    }

    const [tokenType, token] = authHeader.split(' ');

    if (tokenType !== 'Bearer') {
        res.status(403)
        res.send("Invalid Token");
        return;
    }
    try {
        const user = jsonwebtoken.verify(token, "key");
        req.user = user;
    }
    catch (err) {
        res.status(401);
        res.send("Invalid Token");
        return;
    }
    next();
}

export const adminValidation = (req, res, next) => {
    if (req.user.role !== 'Admin') {
        res.status(403);
        res.send("Forbidden");
        return;
    }
    next();
}

export const productReqBodyValidate = (req, res, next) => {
    const validation = productReqBodySchema.validate(req.body);

    if (validation.error) {
        res.status(400);
        res.send("Products are not valid");
        return;
    }
    next();
}

export const orderReqBodyValidate = (req, res, next) => {
    const validation = orderReqBodySchema.validate(req.body);

    if (validation.error) {
        res.status(400);
        res.send("Products are not valid");
        return;
    }
    next();
}
