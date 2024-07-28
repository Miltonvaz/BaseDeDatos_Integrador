import express from 'express';
import bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
import userRoutes from './User/routes/userRoutes';
import { errorHandler } from './shared/middlewares/errorHandlers';
import { notFoundHandler } from './shared/middlewares/notFoundHandlers';
import productsRoutes from './product/routes/productRoutes';
import purchaseOrderRoutes from './purchase_order/routes/purchaseOrderRoutes';
import roleRoutes from './role/routes/roleRoutes';
import categoryRouters from './category/routes/categoryRoutes';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';

import https from 'https';
import fs from 'fs';

import statusRoutes from './status/routes/statusRoutes';
import eventRoutes from './calendarEvent/routes/calendarEventRoutes';

dotenv.config();

const app = express();
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const corsOptions = {
  origin: ['https://ferreteriaapi.integrador.xyz', 'http://localhost:3000'],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204
};

app.use(cors(corsOptions));


app.use('/uploads', express.static(path.join(__dirname, '../dist/uploads')));

app.use('/api/users', userRoutes);
app.use('/api/rol', roleRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/categories', categoryRouters);
app.use('/api/purchaseOrders', purchaseOrderRoutes);
app.use('/api/status', statusRoutes);
app.use('/api/event', eventRoutes);

app.use(notFoundHandler);
app.use(errorHandler);




const port = parseInt(process.env.PORT as string, 10) || 3000;

const options = {
key: fs.readFileSync('privkey.pem'),
cert: fs.readFileSync('fullchain.pem')
};


https.createServer(options, app).listen(port, () => {
  console.log('Serving static files from:', path.join(__dirname, '../dist/uploads'));
  console.log(`Servidor HTTPS corriendo en el puerto ${port}`);
});

/*
app.listen(port, () => {
  console.log(`Servidor HTTP corriendo en el puerto ${port}`);
});
*/
