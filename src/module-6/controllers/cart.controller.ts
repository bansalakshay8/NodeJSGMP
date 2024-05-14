import { Cart } from "../entities/cart.entity.ts";
import { emptyCart, findUserCart, order, update } from "../services/cart.service.ts";

export const getUserCart = async (req, res, next) => {
    const userCart: Cart = await findUserCart(req.get('x-user-id'));
    res.status(200);
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(userCart));
}

export const updateCart = async (req, res, next) => {
    const userCart: Cart = await update(req.get('x-user-id'), req.body);
    res.status(200);
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(userCart));
}

export const deleteFullCart = async (req, res, next) => {
    const userCart: Cart = await emptyCart(req.get('x-user-id'));
    res.status(200);
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(userCart));
}

export const placeOrder = async (req, res, next) => {
    await order(req.body);
    res.status(200);
    res.send("Order Created");
}