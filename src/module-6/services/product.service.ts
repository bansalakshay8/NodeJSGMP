import { getProducts } from "../data/product.db.ts";
import { Product } from "../models/product.model.ts";

export async function getAllProducts() {
    const products: string = await getProducts() as string;
    return JSON.parse(products);
}

export async function getProduct(productId: string) {
    const products: Array<Product> = await getAllProducts();
    return products.find((product: Product) => product.id === productId);
}
