//Este script conecta el scket/cliente con el socket/servidor

const socket = io()

    socket.on('productos', data=>{
        console.log(data);
    })

    console.log("Desde el script")

    socket.emit('message', 'Mensaje desde el socket cliente')

    socket.on('evento_todos', data=>{
        console.log(data)
    })