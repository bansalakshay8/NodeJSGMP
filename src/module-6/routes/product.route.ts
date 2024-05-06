import { Router } from "express";
import * as ProductController from '../controllers/product.controller.ts';

export const ProductRoutes = Router();

ProductRoutes.get('/', ProductController.getProducts);
ProductRoutes.get('/:productId', ProductController.getSingleProduct);
