import Joi from "joi";
// import { findUser } from "./services/user.service.ts";
// import { IUser } from "./models/user.model.ts";
import { AppDataSource } from "./server_rdbms.ts";
import { User } from "./entities/user.entity.ts";

const productReqBodySchema = Joi.object({
    productId: Joi.string().required(),
    count: Joi.number().required(),
});

const orderReqBodySchema = Joi.object({
    id: Joi.string().required(),
    total: Joi.number().required(),
})

export const userValidation = async (req, res, next) => {
    const userId = req.get('x-user-id');
    const userRepository = AppDataSource.getRepository(User);
    if (!userId) {
        res.status(403);
        res.send("You must be authorized user");
        return;
    }

    const user: User = await userRepository.findOneBy({
        id: userId
    });

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
    const validation = orderReqBodySchema.validate(req.body);

    if (validation.error) {
        res.status(400);
        res.send("Products are not valid");
        return;
    }
    next();
}
