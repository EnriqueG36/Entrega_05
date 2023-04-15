//Contiene los endpoint de la ruta /api/products/

const { Router } = require('express');		//Importamos router
const router = Router()				        //Intanciamos
const {ProductManager} = require('../ProductManager.js');              //Importamos la clase productManager
//const { resourceLimits } = require('worker_threads');

const product = new ProductManager('./productData.json')             //Instanciamos la clase product manager


//Configuracion de los endpoints
router.get('/:pid/', (request, response)=>{

    const productId = request.params.pid;                                       //Esta variable almacena el id introducido por request.params
    product.getProductById(productId).then(result => {                          
       
        response.send(result);                                                  //Respondemos con el resultado de la promesa
    });                  

})

router.get('/', (request,response)=>{
    product.getProducts().then(result => {                                      //Aquí leemos nuestro archivo de productos y guardamos todo el contenido en result
    let notAllProducts = [];                                                    //Este arreglo vacia contendrá la cantidad de items a mostrar, en caso de que se usen request.query
    let itemLimit = request.query.limit                                         //Esta variable guarda el request.query

    if (itemLimit > result.length) itemLimit = response.length;                 //Si el query introducido fuera mayor que el largo del arreglo de productos, lo limitaremos a su propiedad length
   
    if (itemLimit == 0 || itemLimit == null)    response.send(result);          //Si no se introdujo request.query o es igual a 0, mostrará todos los productos 
    else{                                                                       //De otra forma copiamos los elementos del arreglo allProducts a notAllProducts hasta el limite solicitado
        for (i = 0; i < itemLimit; i++)
        {
            notAllProducts[i] = result[i];
        }

        response.send(notAllProducts);                                          //Respondemos con el nuevo arreglo
    }
});
   
})

router.post('/', (req, res) => {

    const newProduct = req.body;
    
    product.addProduct(newProduct).then(result => {
        res.send({mensaje: "Producto nuevo agregado", info: result})
    })

})

router.put('/:pid', (req,res) => {

    const productId = req.params.pid;
    const productBody = req.body;

    product.updateProduct(productId, productBody).then(result => {
        res.send({mensaje: "Producto actualizado", info: result})
    })

})

router.delete('/:pid', (req, res)=>{

    const productId = req.params.pid;
    product.deleteProduct(productId).then(result => {
        res.send(result)
    })

})


module.exports = router