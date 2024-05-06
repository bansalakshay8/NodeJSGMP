import { getAllCarts, updateUserCart } from "../data/cart.db.ts";
import { Cart, CartItem } from "../models/cart.model.ts";
import { v4 as uuidv4 } from 'uuid';
import { Product } from "../models/product.model.ts";
import { getProduct } from "./product.service.ts";
import { Order } from "../models/order.model.ts";
import { createOrder, getOrders } from "../data/order.db.ts";

export async function findUserCart(userId: string) {
    const carts: string = await getAllCarts() as string;
    let userCart: Cart = JSON.parse(carts).find((cart: Cart) => cart.userId === userId);

    if(!userCart) {
        userCart = {
            id: uuidv4(),
            userId: userId,
            items: [],
            total: 0,
        }
        updateUserCart([...JSON.parse(carts), userCart]);
    }
    return userCart;
}

export async function update(userId: string, reqBody: { productId: string, count: number }) {
    const updateItem: { productId: string, count: number } = reqBody;
    const cartsJSON: string = await getAllCarts() as string;
    const carts: Array<Cart> = JSON.parse(cartsJSON);
    let userCart: Cart = carts.find((cart: Cart) => cart.userId === userId);
    if(!userCart) {
        userCart = {
            id: uuidv4(),
            userId: userId,
            items: [],
            total: 0
        }
        carts.push(userCart);
    }

    const cartItemIndex: number = userCart.items.findIndex((cartItem: CartItem) => cartItem.product.id === updateItem.productId);
    if(cartItemIndex < 0) {
        const product: Product = await getProduct(updateItem.productId);
        userCart.items = [...userCart.items, { product: product, count: updateItem.count }];
    }
    else {
        if(!updateItem.count) {
            userCart.items.splice(cartItemIndex, 1);
        }
        else {
            userCart.items[cartItemIndex] = {
                ...userCart.items[cartItemIndex],
                count: updateItem.count,
            }
        }
    }
    userCart.total = calculateTotal(userCart);
    updateUserCart([...carts]);
    return userCart;
}

function calculateTotal(userCart: Cart): number {
    return userCart.items.reduce((acc: number, item: CartItem) => acc + (item.count * item.product.price), 0);
}

export async function emptyCart(userId: string) {
    const cartsJSON: string = await getAllCarts() as string;
    const carts: Array<Cart> = JSON.parse(cartsJSON);
    let userCart: Cart = carts.find((cart: Cart) => cart.userId === userId);

    if(userCart) {
        userCart.items = [];
        userCart.total = 0;
    }
    updateUserCart([...carts]);
    return userCart;
}

export async function order(cart: Cart) {
    const ordersJSON: string = await getOrders() as string;
    const orders: Array<Order> = JSON.parse(ordersJSON);
    orders.push({
        ...cart,
        id: uuidv4(),
        cartId: cart.id,
    });
    await createOrder(orders); 
    await emptyCart(cart.userId);
}
