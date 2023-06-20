import express from 'express';
import productRouter from './src/routes/productRoutes.js';
import cartRouter from './src/routes/cartRoutes.js';
import handlebars from 'express-handlebars';
import viewsRouter from './src/routes/viewsRoutes.js'; 
import __dirname from './src/utils.js';

const app = express();

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


const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
export default app;