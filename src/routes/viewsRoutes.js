import { Router } from "express";
import fs from "fs";
import __dirname from '../utils.js';
const viewsRouter = Router();

viewsRouter.get('/', async (req, res) => {
  try {
    const productsData = await fs.promises.readFile(
      __dirname + '/data/products.json',
      'utf-8'
    );
    const products = JSON.parse(productsData);
    res.render('home', { products });
  } catch (error) {
    console.log('Error al leer los productos', error);
    res.status(500).send('Error al leer los productos');
  }
});


export default viewsRouter;
