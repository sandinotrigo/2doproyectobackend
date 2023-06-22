import express from 'express';
import productRouter from './routes/productRoutes.js';
import cartRouter from './routes/cartRoutes.js';
import handlebars from 'express-handlebars';
import viewsRouter from './routes/viewsRoutes.js'; 
import __dirname from './utils.js';
import { Server } from 'socket.io';

const app = express();

//sockets
const httpServer = app.listen(8080,()=>console.log("listening on http server"));// tener en cuenta que ya tengo el listening on server abajo, tendre que borrar este?
app.use('/socket.io', express.static(__dirname + '/node_modules/socket.io/client-dist'));
const socketServer = new Server (httpServer);

socketServer.on('conection', socket =>{
  console.log("nuevo cliente conectado");
} )

//HANDLEBARS
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');
app.use(express.static(__dirname+'/public'));



app.use((req, res, next) => {
  res.setHeader("Content-Security-Policy", "default-src 'self'");
  next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//ViewsRputes
app.use('/', viewsRouter);

//ManagerRoutes
app.use('/products', productRouter);
app.use('/carts', cartRouter);


/*const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});*/
export default app;