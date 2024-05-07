import Joi from "joi";
import { IUser } from "./models/user.model.ts";
import { findUser } from "./services/user.service.ts";

const productReqBodySchema = Joi.object({
    productId: Joi.string().required(),
    count: Joi.number().required(),
});

const orderReqBodySchema = Joi.object({
    id: Joi.string().required(),
    userId: Joi.string().required(),
    items: Joi.array().items(Joi.object({
        product: Joi.object({
            id: Joi.string().required(),
            title: Joi.string().required(),
            description: Joi.string().required(),
            price: Joi.number().required(),
        }).required(),
        count: Joi.number().required(),
    })).required(),
    total: Joi.number().required(),
})

export const userValidation = async (req, res, next) => {
    const userId = req.get('x-user-id');

    if (!userId) {
        res.status(403);
        res.send("You must be authorized user");
        return;
    }

    const user: IUser = await findUser(userId);

    if (!user) {
        res.status(401);
        res.send("User is not authorized");
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
    console.log(req.body);
    const validation = orderReqBodySchema.validate(req.body);

    if (validation.error) {
        res.status(400);
        res.send("Products are not valid");
        return;
    }
    next();
}
