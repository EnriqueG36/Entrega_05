//Contiene los endpoint de la ruta /api/products/

const { Router } = require('express');		//Importamos router
const router = Router()				        //Intanciamos
const {CartManager} = require('../CartManager.js');              //Importamos la clase productManager
//const { resourceLimits } = require('worker_threads');

const cart = new CartManager('./carrito.json')             //Instanciamos la clase product manager


//Configuracion de los endpoints
router.post('/', (req, res) =>{
    cart.addCart().then(result => {
        res.send(result);
    })
})

router.get('/:cid', (req, res)=>{

    const cartId = req.params.cid;
    cart.listProductsOncart(cartId).then(result => {
        res.send(result)
    })

})

router.post('/:cid/product/:pid', (req, res)=>{

    const cartId = req.params.cid;
    const productId = req.params.pid;

    cart.addProductToCart(cartId, productId).then(result => {
        res.send(result)
    })

})

module.exports = router