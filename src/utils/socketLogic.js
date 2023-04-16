//En esta funcion se meterá la logia de los socket, eventos emitidos y escuchados
const {ProductManager} = require('../ProductManager');              //Importamos la clase productManager

const product = new ProductManager('./productData.json')  			//INtanciamos la clase ProductManager




const websocketFuncion = (socketServer) =>{
	socketServer.on('connection', socket =>{
		console.log(`Nuevo cliente conectado, id: ${socket.id}`)
	
		let listaProductos;

		product.getProducts().then(result => {          							//Aquí leemos nuestro archivo de productos y guardamos todo el contenido en result
		
			listaProductos = JSON.stringify(result, "null", 2)						//Convertimos a texto el arreglo de productos
			
			socketServer.emit('productos', listaProductos)							//Emite el evento 'products' a todos los sockets conectados
		})

		
	
		//Escucha por el evento agregarNuevoProductoFormulario, recibe desde el lado del cliente un objeto de un producto nuevo, lo pasa a nuestro productManager
		socket.on('agregarNuevoProductoFormulario', data =>{

			product.addProduct(data).then(result => {
					console.log(result)
			})

		})

		//Escucha por el evento eliminarProductoFormulario, recibe un numero de id de producto, lo elimina del arreglo pasandolo a nuestro productManager
		socket.on('eliminarProductoFormulario', data =>{

			product.deleteProduct(data).then(result => {
					console.log(result)
			})

		})

	})
}

module.exports = { 
    websocketFuncion
}