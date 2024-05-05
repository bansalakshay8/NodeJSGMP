import { Router } from "express";
import * as CartController from "../controllers/cart.controller.ts";
import { orderReqBodyValidate, productReqBodyValidate } from "../validation.ts";

export const CartRoutes = Router();

CartRoutes.get('/', CartController.getUserCart);
CartRoutes.put('/', productReqBodyValidate, CartController.updateCart);
CartRoutes.delete('/', CartController.deleteFullCart);
CartRoutes.post('/checkout', orderReqBodyValidate, CartController.placeOrder);
