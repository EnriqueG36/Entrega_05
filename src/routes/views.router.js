//Contiene las rutas de las vistas

const { Router } = require('express')
const router = Router()

const {ProductManager} = require('../ProductManager');              //Importamos la clase productManager

const product = new ProductManager('./productData.json')  


let listaProductos;
let objetoPlantilla ={};


router.get('/', (req, res)=>{
		
	product.getProducts().then(result => {          //Aquí leemos nuestro archivo de productos y guardamos todo el contenido en result
		
		listaProductos = result						//Este objeto es el que se pasa a la plantilla, no se debe pasar directamente el arreglo de productos
		objetoPlantilla = {listaProductos}
		res.render('home', objetoPlantilla)
	})
})

router.get('/realtimeproducts', (req, res)=>{

	res.render('home', objetoPlantilla)
})


module.exports = router
