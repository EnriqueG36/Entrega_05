//Contiene las rutas de las vistas

const { Router } = require('express')
const router = Router()
//const socketServer = require('../app.js')

const {ProductManager} = require('../ProductManager');              //Importamos la clase productManager

const product = new ProductManager('./productData.json')  			//INtanciamos la clase ProductManager


let listaProductos;
let objetoPlantilla ={};

/*Ésta ruta muestra todos los productos en el archivo de productos,
la obtiene con nuestro productManager y la copia en un objeto de configuración, 
que a su vez se pasa a la plantilla
*/
router.get('/', (req, res)=>{
		
	product.getProducts().then(result => {          //Aquí leemos nuestro archivo de productos y guardamos todo el contenido en result
		
		listaProductos = result						//Este objeto es el que se pasa a la plantilla, no se debe pasar directamente el arreglo de productos
		objetoPlantilla = {listaProductos}
		res.render('home', objetoPlantilla)
		
	})
})
 /*Ésta ruta debe mostrar todos los productos en el archivo en tiempo real, 
 conforme se agreguen o se eliminen productos*/

router.get('/realtimeproducts', (req, res)=>{

	/*socket.broadcast.('evento', dato =>{
		dato = product.
	})
	*/

	product.getProducts().then(result => {          //Aquí leemos nuestro archivo de productos y guardamos todo el contenido en result
		
		listaProductos = result						//Este objeto es el que se pasa a la plantilla, no se debe pasar directamente el arreglo de productos
		objetoPlantilla = {listaProductos}
		res.render('realTimeProducts', objetoPlantilla)
		
	})


	//res.render('realTimeProducts', objetoPlantilla)
})


module.exports = router
