//Este script conecta el scket/cliente con el socket/servidor

const socket = io()

    socket.on('productos', data=>{
        console.log(data);
    })

    console.log("Desde el script")

    //socket.emit('message', 'Mensaje desde el socket cliente')

    socket.on('evento_todos', data=>{
        console.log(data)
    })

    //Esta funcion se llama al momento de dar click en el boton del formulario para añadir productos
    function addProductForm () {

        let status;

        if (document.getElementById('productStatusForm').value == ("true" || "TRUE")) {
            status = true;
        } else {
            status = false
        }

        const newProduct = {                                                            //Guarda en un objeto todos los valores recibidos de los campos del formulario

            "title": document.getElementById('productTitleForm').value,
            "description": document.getElementById('productDescriptionForm').value,
            "code": document.getElementById('productCodeForm').value,
            "price": document.getElementById('productPriceForm').value,
            "status": status,
            "stock": document.getElementById('productStockForm').value,
            "category": document.getElementById('productCategoryForm').value,
            "thumbnails": [document.getElementById('productThumbnailForm').value],
            
        }

        socket.emit('agregarNuevoProductoFormulario', newProduct)                       //Este evento emite al servidor el nuevo producto para guardarlo en el archivo

    }

    //Esta funcion se llama al momento de dar click en el boton del formulario para eliminar productos
    function deleteProductByIdForm () {

        const idProductoEliminar = document.getElementById('idProductoEliminar').value      //Recibe el id del producto a eliminar y lo guarda en la variable

        socket.emit('eliminarProductoFormulario', idProductoEliminar)                       //Emite este evento que pasa al servidor el numero de id del producto a eliminar

    }