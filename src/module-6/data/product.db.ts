// import fs from 'fs';
import { Product } from '../entities/product.entity.ts';
import { AppDataSource } from '../server_rdbms.ts';

export function getProducts() {
    const productRepository = AppDataSource.getRepository(Product);
    return productRepository.find();
}

export function getSingleProduct(productId: string) {
    const productRepository = AppDataSource.getRepository(Product);
    return productRepository.findOneBy({ id: productId });
}
