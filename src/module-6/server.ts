import express from 'express';
import { CartRoutes } from './routes/cart.route.ts';
import { ProductRoutes } from './routes/product.route.ts';
import { userValidation } from './validation.ts';
import bodyParser from 'body-parser';
import mongoose, { ConnectOptions } from 'mongoose';

const uri: string = 'mongodb://localhost:27017/mydatabase';
const options: ConnectOptions = {
    authSource: 'admin',
    user: "root",
    pass: "nodegmp",
}

mongoose.connect(uri, options)
    .then(() => console.log("Succesfully connected to MongoDB"))
    .catch((error: Error) => console.log(`Error connecting to MongoDB: ${error.message}`))

const app = express();
const jsonParser = bodyParser.json();

app.use('/api/profile/cart/', userValidation, jsonParser, CartRoutes);
app.use('/api/products/', userValidation, ProductRoutes);

app.listen(8000, () => {
    console.log('Server start');
});
