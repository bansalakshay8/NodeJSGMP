import { getProducts, getSingleProduct } from "../data/product.db.ts";
import { IProduct } from "../models/product.model.ts";

export async function getAllProducts() {
    const products: Array<IProduct> = await getProducts();
    return products;
}

export async function getProduct(productId: string) {
    const product: IProduct = await getSingleProduct(productId);
    return product;
}
