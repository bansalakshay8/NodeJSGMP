import { Product } from '../entities/product.entity.ts';
import { logger } from '../server_rdbms.ts';
import { getAllProducts, getProduct } from '../services/product.service.ts';

export const getProducts = async (req, res, next) => {
    const products: Array<Product> = await getAllProducts();
    logger.info('GET /api/products/');
    res.status(200);
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(products));
}

export const getSingleProduct = async (req, res, next) => {
    const product: Product = await getProduct(req.params.productId);
    logger.info(`GET /api/products/${req.params.productId}`);
    res.status(200);
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(product));
}
