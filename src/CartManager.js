//Clase CartManager para el manejo de carros de compra, crear, agregar productos, listar
const fs = require('fs');                           //Importamos el modulo fileSystem

class CartManager {
    constructor (path) {                                    //El constructor recibe como argumento el path donde se generará el archivo de productos
        this.path = path;
        this.carts = [];                                    //Se crea un arreglo vacio "carts"
      
    }

    //Requisitos de un carro de compra
    //id autoincremental
    //productos
    

    //Crea un nuevo carrito
    async addCart(){         
        try{
            let newCart = {};                                                       //Generamos el "nuevo carro" como un objeto vacío
            const fileContent = await fs.promises.readFile(this.path, 'utf-8');     //Leemos el contenido del archivo de carros actualmente creados
            const fileContentParseado = JSON.parse(fileContent);                    //Parseamos para poder trabajar con el 
                        
            const id = fileContentParseado.length+1;                                //Generamos un id para el nuevo carrito
            newCart.id = id;                                                        //Creamos e igualamos el atributo id del nuevo carrito al id generado antes
            newCart.products = [                                                    //El atributo products es un arreglo de objetos con atributos id y quantity, como se trata de un carro nuevo sin productos, id = null y quantity = 0
                {id: null, quantity: 0}
            ];
            fileContentParseado.push(newCart);                                      //Agregamos el nuevo carrito al arreglo de carritos leído del archivo

            const fileContentJSON = JSON.stringify(fileContentParseado, 'null', 2); //Convertimos a formato JSON el arreglo de carritos
            await fs.promises.writeFile(this.path, fileContentJSON, 'utf-8');       //Se sobre escribe el archivo de carritos con la nueva información
            return {message: `Carro creado con id ${id}`};                          //Retornamos este objeto indicando que se creó el carrito
        }
        catch(error){
            return error
        }
    }

    //Lista los productos que pertenezcan al carrito cuyo id se proporcione
    async listProductsOncart(cartId){
        try{
            let findedCart;
            const fileContent = await fs.promises.readFile(this.path, 'utf-8');     //Leemos el contenido del archivo de carros actualmente creados
            const fileContentParseado = JSON.parse(fileContent);                    //Parseamos para poder trabajar con el 

            fileContentParseado.forEach(element => {                                //Recorremos el arreglo de carros en busca de uno cuyo atributo id coinicda con el cartId pasado a la funcion, si se encuentra se copia en la variable findedCart
                //console.log(element)
                if (element.id == cartId)
                    findedCart = element;
            });
    
            //console.log(newObject)
    
            if (findedCart == null) return (`Id ${cartId} no se encuentra`);          //Si el atributo Id no fue encontrado al recorrer el arreglo devuelve este mensaje
            else return findedCart;                                                     //De otra forma devuelve el carrito encontrado


        }
        catch(error){
            return error
        }
    }

    async addProductToCart(cartId, productId){
     
        try{
           
            let newObject;

            const fileContent = await fs.promises.readFile(this.path, 'utf-8');                                         //Leemos el contenido del archivo de carros actualmente creados
            const fileContentParseado = JSON.parse(fileContent);                                                        //Parseamos para poder trabajar con el 

            const cartIndex = fileContentParseado.findIndex((element => element.id == cartId))                          //Buscamos en el arreglo el index del objeto cuya propiedad id coincida con la que se pasa por argumento, en caso de que no se encuentre la funcion findIndex retorna un -1
            if (cartIndex == -1) return (`Carrito con Id ${cartId} no se encuentra, no se pudo actualizar`);            //Si el atributo Id es -1, significa que no fue encontrado al recorrer el arreglo, entonces devuelve este mensaje
            
            const productItemIndex = fileContentParseado[cartIndex].products.findIndex((element => element.id == productId))        //Teniendo el index del carro, recorremos su atributo products en busca del id de producto que se pasó a la función

            if (cartIndex !== -1 && productItemIndex !== -1)                                                                        //Se compara si se ha encontrado el indice del carrito, y si dentro de este se ha encontrado un index donde ya exista previamente el id de producto                                                                  
            {
                //const productItemIndex = fileContentParseado[cartIndex].products.findIndex((element => element.id == productId)) 
                //console.log("dentro del if si ya habia producto")
                //console.log(cartIndex)
                //console.log(productItemIndex)
                //console.log(fileContentParseado[cartIndex].products[productItemIndex])
                let itemQuantity = fileContentParseado[cartIndex].products[productItemIndex].quantity + 1;                          //Aquí se define la cantidad de productos con el id de producto pasado a la funcion
                //console.log(itemQuantity)

             newObject = {                                                                                                          //se crea un nuevo objeto donde el atributo arreglo products, contendrá el id del producto pasado a la funcion y la nueva cantidad de ese producto
                //id: cartId,
                products: [{id: productId, quantity: itemQuantity}]
                };  
                //console.log (newObject);

                fileContentParseado[cartIndex].products[productItemIndex].id = newObject.products[0].id;                             
                fileContentParseado[cartIndex].products[productItemIndex].quantity = newObject.products[0].quantity;                //Aqui se iguala la cantidad nueva del objeto buscado en el arreglo de carros en el archivo

            } else {
                newObject = {                                                                                 
                    id: productId, quantity: 1
                    };  

                    fileContentParseado[cartIndex].products.push(newObject)

            }

            //fileContentParseado[index] = newObject;                                                     //Se actualiza el objeto en el arreglo con el nuevo objeto
            const fileContentJSON = JSON.stringify(fileContentParseado, 'null', 2);                     //Se cambia el formato del arreglo de objeto a json    
            await fs.promises.writeFile(this.path, fileContentJSON, 'utf-8');                           //Se escribe el archivo
    
            return (`Se añadio el producto al carrito con el id ${cartId}`);
            
        
        }
        catch(error){
            return error
        }
    }
}


module.exports = { CartManager }             //Importamos la clase CartManager
