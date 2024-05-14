import { DataSource } from "typeorm";
import { User } from "./entities/user.entity.ts";
import { Product } from "./entities/product.entity.ts";
import { Cart, CartItem } from "./entities/cart.entity.ts";
import { Order } from "./entities/order.entity.ts";
import express from 'express';
import bodyParser from "body-parser";
import { adminValidation, userValidation } from "./validation.ts";
import { CartRoutes } from "./routes/cart.route.ts";
import { ProductRoutes } from "./routes/product.route.ts";
import { AuthRoutes } from "./routes/auth.route.ts";

export const AppDataSource: DataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5430,
    username: "node_gmp",
    password: "password123",
    database: "node_gmp",
    synchronize: true,
    logging: true,
    entities: [User, Product, Cart, Order, CartItem],
    subscribers: ['./migrations'],
    migrations: [],
});

AppDataSource.initialize()
    .then(async () => {
        const productRepository = AppDataSource.getRepository(Product);
        const product1 = new Product();
        product1.id = '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d';
        product1.title = 'The Compound Effect';
        product1.description = 'Darren Hardy';
        product1.price = 9;
        await productRepository.save(product1);

        const product2 = new Product();
        product2.id = '9b1deb4d-3b7d-4bad-9bdd-4b0d7a3dcb3d';
        product2.title = 'The Compound Effect';
        product2.description = 'Darren Hardy';
        product2.price = 12;
        await productRepository.save(product2);
    }).catch(err => console.log(err));

const app = express();
const jsonParser = bodyParser.json();

app.use('/api/auth/', jsonParser, AuthRoutes);
app.use('/api/profile/cart/', userValidation, jsonParser, CartRoutes);
app.use('/api/products/', userValidation, ProductRoutes);

app.listen(8000, () => {
    console.log('Server start');
});
