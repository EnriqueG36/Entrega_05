//En esta funcion se meterá la logia de los socket, eventos emitidos y escuchados
const websocketFuncion = (socketServer) =>{
	socketServer.on('connection', socket =>{
		console.log(`Nuevo cliente conectado, id: ${socket.id}`)
	
		socket.on('message', data=>{
			console.log(data);
		})
	
		socket.broadcast.emit('evento_todos', "Mensaje desde el server para todos")
	
		socketServer.emit('productos', "todos los productos van aquí")
	
	})
}

module.exports = { 
    websocketFuncion
}