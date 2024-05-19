import { DataSource } from "typeorm";
import { User } from "./entities/user.entity.ts";
import { Product } from "./entities/product.entity.ts";
import { Cart, CartItem } from "./entities/cart.entity.ts";
import { Order } from "./entities/order.entity.ts";
import express from 'express';
import bodyParser from "body-parser";
import { userValidation } from "./validation.ts";
import { CartRoutes } from "./routes/cart.route.ts";
import { ProductRoutes } from "./routes/product.route.ts";
import { AuthRoutes } from "./routes/auth.route.ts";
import dotenv from "dotenv";
import winston from "winston";

const config = dotenv.config();

const customFormat = winston.format.printf(({ level, message, timestamp }) => {
    return `[${timestamp}] ${level.toUpperCase()} ${message}`;
});

export const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(winston.format.timestamp(), customFormat),
    transports: [
        new winston.transports.File({ filename: 'src/module-6/logs/error.log', level: 'error' }),
        new winston.transports.File({ filename: 'src/module-6/logs/combined.log' }),
    ],
});

export const AppDataSource: DataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
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
    }).catch(err => logger.error(err));

const app = express();
const jsonParser = bodyParser.json();

app.get('/health', (req, res) => {
    logger.info('GET /health');
    res.status(200);
    res.send("Application is healthy");
})
app.use('/api/auth/', jsonParser, AuthRoutes);
app.use('/api/profile/cart/', userValidation, jsonParser, CartRoutes);
app.use('/api/products/', userValidation, ProductRoutes);

const server = app.listen(process.env.PORT, () => {
    logger.info(`Server started on Port - ${process.env.PORT}`);
});

let connections = [];

server.on('connection', (connection) => {
    connections.push(connection);
    connection.on('close', () => {
        connections = connections.filter((currentConnection) => currentConnection !== connection);
    });
});

function shutdown() {
    console.log('Received kill signal, shutting down gracefully');

    server.close(() => {
        console.log('Closed out remaining connections');
        process.exit(0);
    });

    setTimeout(() => {
        console.error('Could not close connections in time, forcefully shutting down');
        process.exit(1);
    }, 20000);
    connections.forEach((connection) => connection.end());
    setTimeout(() => {
        connections.forEach((connection) => connection.destroy());
    }, 100);
}

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);
