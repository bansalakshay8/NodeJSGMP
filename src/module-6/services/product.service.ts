import { getProducts, getSingleProduct } from "../data/product.db.ts";
import { Product } from "../entities/product.entity.ts";

export async function getAllProducts() {
    const products: Array<Product> = await getProducts();
    return products;
}

export async function getProduct(productId: string) {
    const product: Product = await getSingleProduct(productId);
    return product;
}
