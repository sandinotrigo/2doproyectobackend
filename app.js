import express from 'express';
import path from 'path';
import http from 'http';
import { Server } from 'socket.io';
import productRouter from './src/routes/productRoutes.js';

const app = express();
const server = http.createServer(app);
const io = new Server(server);
export const socketServer = io;
app.use((req, res, next) => {
  res.setHeader("Content-Security-Policy", "default-src 'self'");
  next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/products', productRouter);


const PORT = 8080;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
export default app;