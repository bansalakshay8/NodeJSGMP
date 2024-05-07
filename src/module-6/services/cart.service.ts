import { createCart, getCart, updateUserCart } from "../data/cart.db.ts";
import { ICart, ICartItem } from "../models/cart.model.ts";
import { v4 as uuidv4 } from 'uuid';
import { getProduct } from "./product.service.ts";
import { createOrder } from "../data/order.db.ts";
import { IProduct } from "../models/product.model.ts";

export async function findUserCart(userId: string) {
    let userCart: ICart = await getCart(userId);

    if (!userCart) {
        userCart = {
            id: uuidv4(),
            userId: userId,
            items: [],
            total: 0,
        } as ICart;
        userCart = await createCart(userCart);
    }

    return userCart;
}

export async function update(userId: string, reqBody: { productId: string, count: number }) {
    const updateItem: { productId: string, count: number } = reqBody;
    let userCart: ICart = await getCart(userId);
    if (!userCart) {
        userCart = {
            id: uuidv4(),
            userId: userId,
            items: [],
            total: 0
        } as ICart;
        userCart = await createCart(userCart);
    }
    const cartItemIndex: number = userCart.items.findIndex((cartItem) => cartItem.product.id === updateItem.productId);
    if (cartItemIndex < 0) {
        const product: IProduct = await getProduct(updateItem.productId);
        userCart.items = [...userCart.items, { product: product, count: updateItem.count } as ICartItem];
    }
    else {
        if (!updateItem.count) {
            userCart.items.splice(cartItemIndex, 1);
        }
        else {
            userCart.items[cartItemIndex] = {
                ...userCart.items[cartItemIndex],
                count: updateItem.count,
            } as ICartItem;
        }
    }
    userCart.total = calculateTotal(userCart);
    await updateUserCart(userCart);
    return userCart;
}

function calculateTotal(userCart: ICart): number {
    return userCart.items.reduce((acc: number, item: ICartItem) => acc + (item.count * item.product.price), 0);
}

export async function emptyCart(userId: string) {
    let userCart: ICart = await getCart(userId);

    if (userCart) {
        userCart.items = [];
        userCart.total = 0;
    }
    await updateUserCart(userCart);
    return userCart;
}

export async function order(cart: ICart) {
    let newOrder = {
        ...cart,
        id: uuidv4(),
        cartId: cart.id,
    };
    await createOrder(newOrder);
    await emptyCart(cart.userId);
}
