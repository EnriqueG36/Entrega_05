//Desafio entregable 05, Websockets + handlebars

const express = require('express')                              //Importamos el modulo express
const handlebars = require('express-handlebars')                //Importamos el modulo handlebars
const { Server } = require('socket.io')							//Importamos el modulo socket.io


const app = express();                                          //Iniciamos nuestro servidor con express

//Configuración de handlebars:
app.engine('handlebars', handlebars.engine())                   //Definir nuestro motor de plantillas
app.set('views', __dirname+'/views')                            //Settea el directorio donde buscará las carpetas de plantillas
app.set('view engine', 'handlebars')                            //indicamos a express que motor de plantillas se va a usar
app.use(express.static(__dirname+'/public'))

//Configuración del puerto
const PORT = 8080; 

const httpServer = app.listen(PORT, ()=>{
	console.log(`Escuchando en el puerto ${PORT}`);
})

const socketServer = new Server(httpServer);

//URL encoder
app.use(express.urlencoded({extended: true}));
app.use(express.json());											//Si no agregamos este middleware, no recibiremos el req.body de forma correcta

//Importamos la configuracion de nuestras rutas
const productRouter = require('./routes/products.router.js');  	//en userRouter viene toda la configuración de nuestras rutas de products.
const cartRouter = require('./routes/carts.router.js');
const viewRouter = require('./routes/views.router.js');        
const { websocketFuncion } = require('./utils/socketLogic.js');

app.use('/api/products', productRouter)	                        //api es por convención
app.use('/api/carts', cartRouter)
app.use('/', viewRouter)

//console.log(socketServer)
//module.exports = socketServer;

/*
socketServer.on('connection', socket =>{
	console.log(`Nuevo cliente conectado, id: ${socket.id}`)

	socket.on('message', data=>{
		console.log(data);
	})

	socket.broadcast.emit('evento_todos', "Mensaje desde el server para todos")

	socketServer.emit('productos', "todos los productos van aquí")

})
*/

//Esta funcion contiene nuestros eventos emit y on
websocketFuncion(socketServer);