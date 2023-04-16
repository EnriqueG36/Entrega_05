//En esta funcion se meterá la logia de los socket, eventos emitidos y escuchados
const {ProductManager} = require('../ProductManager');              //Importamos la clase productManager

const product = new ProductManager('./productData.json')  			//INtanciamos la clase ProductManager




const websocketFuncion = (socketServer) =>{
	socketServer.on('connection', socket =>{
		console.log(`Nuevo cliente conectado, id: ${socket.id}`)
	
		/*socket.on('message', data=>{
			console.log(data);
		})*/
	
		socket.broadcast.emit('evento_todos', "Mensaje desde el server para todos")
	
		socketServer.emit('productos', "todos los productos van aquí")
	
		
		socket.on('agregarNuevoProductoFormulario', data =>{

			product.addProduct(data).then(result => {
					console.log(result)
			})

		})


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