// import fs from 'fs';
// import Cart, { ICart } from '../models/cart.model.ts';
import { Cart, CartItem } from '../entities/cart.entity.ts';
import { AppDataSource } from '../server_rdbms.ts';

export function getCart(userId: string) {
    const cartRepository = AppDataSource.getRepository(Cart);
    return cartRepository.findOneBy({ user: { id: userId } });
}

export function getCartItem(cartId: string, productId: string) {
    const cartItemRepository = AppDataSource.getRepository(CartItem);
    return cartItemRepository.findOneBy({ cart: { id: cartId }, product: { id: productId } });
}

export async function getAllCartProducts(cartId: string) {
    return await AppDataSource.getRepository(CartItem)
        .createQueryBuilder('cartItem')
        .where('cartItem.cart.id = :id', { id: cartId })
        .leftJoinAndSelect('cartItem.product', 'product')
        .getMany();
}

export function updateCartItem(cartItem: CartItem) {
    const cartItemRepository = AppDataSource.getRepository(CartItem);
    return cartItemRepository.save(cartItem);
}

export function updateUserCart(userCart: Cart) {
    const cartRepository = AppDataSource.getRepository(Cart);
    return cartRepository.save(userCart);
}

export async function removeCartItems(cartId: string) {
    const cartItemRepository = AppDataSource.getRepository(CartItem);
    const cartItems = await cartItemRepository.findBy({ cart: { id: cartId } });
    return cartItemRepository.remove(cartItems);
}
