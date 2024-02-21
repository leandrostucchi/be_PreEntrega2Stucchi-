import express from 'express'
import productManager from "../public/js/products.js"
const router = express.Router();

//? http://localhost:8000/api/products/ ==> trae todo
//? http://localhost:8000/api/products/?limit=2 ==> trae limitado

router.get('/',async (req,res) =>{
    const limit = parseInt(req.query.limit) || null;
    let resultado= null;
    console.log('leer producto productos')
    try {
        if(limit){
            resultado = await productManager.getProductByLimit(limit)
        }else{
            resultado = await productManager.getProducts()
        }
        res.status(200).send(resultado )
    } catch (error) {
        res.status(500).send(`Mensaje de error: ${error} ${resultado}`); 
    }
})

//? http://localhost:8000/api/products/1

router.get('/:pid', async (req,res) =>{
    let id = parseInt(req.params.pid);
    let resultado = await productManager.getProductById(id)
    res.send(resultado)
})



//? http://localhost:8000/api/products/
/* body 
{
    "tittle": "producto prueba3",
    "description": "Este es un producto prueba3",
    "price": 2,
    "thumbnail": "Sin imagen3",
    "code": "abc333",
    "stock": 21
}

*/
router.post('/addProduct', (req,res) =>{
    let body= req.body;
    let resultado= productManager.addProduct(body.tittle,body.description,body.price,body.thumbnail,body.code,body.stock);
    res.redirect("/realtimeproducts");
    //res.send(resultado);
})

//? http://localhost:8000/api/products/
/*
{
    "tittle": "producto prueba1",
    "description": "Este es un producto prueba1",
    "price": 200,
    "thumbnail": "Sin imagen1",
    "code": "abc125",
    "stock": 25,
    "id": 1
} 
 */
router.put('/', async (req,res) =>{
    let body= req.body;
    let resultado= await productManager.updateProduct(body.tittle,body.description,body.price,body.thumbnail,body.code,body.stock,body.pid);
    res.send(resultado);
})


//? http://localhost:8000/api/products/1

router.delete("/deleteProduct/:id", async (req, res) => {
    let id = parseInt(req.params.id);
console.log("delete " + id)
    let resultado = await productManager.deleteProduct(id)
    res.send(resultado)
})

//? Test
// http://localhost:8000/product
// http://localhost:8000/product/1
// http://localhost:8000/product/?limit=2


//export default router;

//? Test
//let productoNuevo = new productManager();
//productoNuevo.delArchivo();

// productoNuevo.addProduct('producto prueba1','Este es un producto prueba1',200,'Sin imagen1','abc123',25);
// productoNuevo.addProduct('producto prueba2','Este es un producto prueba2',200,'Sin imagen2','abc124',25);
// productoNuevo.addProduct('producto prueba3','Este es un producto prueba3',200,'Sin imagen3','abc121',25);
// productoNuevo.addProduct('producto prueba3','Este es un producto prueba3',200,'Sin imagen3','abc123',25); //codigo duplicado

//productoNuevo.getProducts();

//productoNuevo.getProductById(1);
// productoNuevo.getProductById(5);

//productoNuevo.deleteProduct(3);

//productoNuevo.updateProduct('producto prueba2','Este es un producto prueba2',400,'Sin','abc124',25,2);
//productoNuevo.updateProduct('prueba1','Este es un producto prueba1',200,'Sin imagen1','abc123',125,1);

