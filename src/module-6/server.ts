import express from 'express';
import { CartRoutes } from './routes/cart.route.ts';
import { ProductRoutes } from './routes/product.route.ts';
import { userValidation } from './validation.ts';
import bodyParser from 'body-parser';

const app = express();
const jsonParser = bodyParser.json();

app.use('/api/profile/cart/', userValidation, jsonParser, CartRoutes);
app.use('/api/products/', userValidation, ProductRoutes);

app.listen(8000, () => {
    console.log('Server start');
});
