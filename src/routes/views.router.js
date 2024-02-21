import express from 'express';
const router = express.Router();
import productManager from '../daos/products.dao.js';
import cartManager from '../daos/products.dao.js';
import productsRouter from './productsModel.router.js';

router.get('/', async (req, res) => {
  let products = await productManager.getProducts();
  res.render('home', { products });
});

router.get('/products', async (req, res) => {
  console.log("get products")
  let products = await productManager.getProducts();
  //res.render('products', { products });
});

router.get('/productsNew', async (req, res) => {
  console.log("get productsNew")
  let products = null;
  //let products = await productManager.getProducts();
  //console.log(products)
  res.render('productsNew', { products });
});

router.get('/productsUpd', async (req, res) => {
  console.log("get productsUpd")
  console.log(req.param.cid)
  console.log(req.body)
  let products = null;
  //let products = await productManager.getProducts();
  //console.log(products)
  res.render('productsUpd', { products });
});



router.post('/addProduct', (req,res) =>{
  let body= req.body;
  console.log('view router.post /addProduct')
  console.log(req.body)
  let resultado= productManager.addProduct
  (body.productTittle,body.productDescription,'',body.productPrice,body.productStock,body.productCode)
  //  (body.productTittle,body.description,body.thumbnail,body.price,body.stock,body.code);
  res.render("productsNew",
              {}
          );
})

router.post('/updProduct', (req,res) =>{
  let body= req.body;
  console.log('view.Router router.put /updProduct')
  console.log(body)
  console.log(req.param.cid)
  res.render("productsUpd",  {});
})



router.get('/carts', async (req, res) => {
  console.log("get carts")
  let carts = await cartManager.readCartByID(cid)
  res.render('carts', { carts });
});

export default router;
