import { getAllCartProducts, getCart, getCartItem, removeCartItems, updateCartItem, updateUserCart } from "../data/cart.db.ts";
import { v4 as uuidv4 } from 'uuid';
import { getProduct } from "./product.service.ts";
import { Cart, CartItem } from "../entities/cart.entity.ts";
import { Product } from "../entities/product.entity.ts";
import { createOrder } from "../data/order.db.ts";

export async function findUserCart(userId: string) {
    let userCart: Cart = await getCart(userId);
    return userCart;
}

export async function update(userId: string, reqBody: { productId: string, count: number }) {
    const updateItem: { productId: string, count: number } = reqBody;
    let userCart: Cart = await getCart(userId);
    let cartItem: CartItem = await getCartItem(userCart.id, updateItem.productId);
    if (cartItem) {
        cartItem.count = updateItem.count;
    }
    else {
        const product: Product = await getProduct(updateItem.productId);
        cartItem = new CartItem();
        cartItem.id = uuidv4();
        cartItem.product = product;
        cartItem.count = updateItem.count;
        cartItem.cart = userCart;
    }
    await updateCartItem(cartItem);

    const cartProducts = await getAllCartProducts(userCart.id);
    const total = calculateTotal(cartProducts);
    userCart.total = total;
    updateUserCart(userCart);
    return userCart;
}

function calculateTotal(cartItems: Array<CartItem>) {
    return cartItems.reduce((acc: number, item: CartItem) => {
        return acc + (item.count * item.product.price)
    }, 0);
}

export async function emptyCart(userId: string) {
    let userCart: Cart = await getCart(userId);

    if (userCart) {
        userCart.cartItem = [];
        userCart.total = 0;
    }
    await updateUserCart(userCart);
    await removeCartItems(userCart.id);
    return userCart;
}

export async function order(cart: Cart) {
    await createOrder(cart);
}
