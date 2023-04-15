//Clase ProductManager para el manejo de los productos, mostrar, agregar, actualizar, eliminar

const fs = require('fs');                           //Importamos el modulo fileSystem

class ProductManager {
    constructor (path) {                                         //El constructor recibe como argumento el path donde se generará el archivo de productos
        this.path = path;
        this.products = [];                                     //Se crea un arreglo vacio "products"

        //Estas lineas que siguen generan el archivo 

        /*
       const productsJSON = JSON.stringify(this.products);     
       fs.writeFileSync(path, productsJSON, 'utf-8');          
       */
       
    }

    //Requisitos de un producto
    //id autoincremental
    //title
    //description
    //price
    //thumbnail
    //code
    //stock

    //Debe añadir un producto al arreglo y escribirlo en el archivo productos
    async addProduct(newProduct){         
        try{
            
            const fileContent = await fs.promises.readFile(this.path, 'utf-8');     
            const fileContentParseado = JSON.parse(fileContent);
                        
            const id = fileContentParseado.length+1;
            newProduct.id = id;
            
            fileContentParseado.push(newProduct);

            const fileContentJSON = JSON.stringify(fileContentParseado, 'null', 2);
            await fs.promises.writeFile(this.path, fileContentJSON, 'utf-8');       
            return newProduct;
        }
        catch(error){
            return error
        }
    }

    //Muestra todo el contenido del archivo productos
    async getProducts(){
        try{
        console.log ("Dentro de getProducts");
        const fileContent = await fs.promises.readFile(this.path, 'utf-8');            //Leemos el contenido del archivo y lo asignamos a la variable
        const fileContentParseado = JSON.parse(fileContent);
        return fileContentParseado;                                         //Retorna la variable
        }
        catch(error){
            return error
        }
    }
    //Lee el archivo y muestra el producto solicitado por su id
    async getProductById(productId){

        try{

        let newObject;                                                      //Declaramos una variable vacia, contendra el objeto buscado en el archivo

        console.log(`Dentro de la funcion getProductByID, buscando el id ${productId}`);

        const fileContent = await fs.promises.readFile(this.path, 'utf-8');            //Leemos el contenido del archivo y lo asignamos a la variable
        const fileContentParseado = JSON.parse(fileContent);                //Convertimos el contenido del archivo de texto a un objeto de js

        fileContentParseado.forEach(element => {
            //console.log(element)
            if (element.id == productId)
                newObject = element;
        });

        //console.log(newObject)

        if (newObject == null) return (`Id ${productId} no se encuentra`);          //Si el atributo Id no fue encontrado al recorrer el arreglo devuelve este mensaje
        else return newObject;   
        }
        catch(error){
            return error
        }

    }
    //Actualiza el producto solicitado por su id
    async updateProduct(productId, newProductInfo){
             
        try{
        const fileContent = await fs.promises.readFile(this.path, 'utf-8');             //Leemos el contenido del archivo y lo asignamos a la variable
        const fileContentParseado = JSON.parse(fileContent);                            //Convertimos el contenido del archivo de texto a un objeto de js

        const index = fileContentParseado.findIndex((element => element.id == productId))          //Buscamos en el arreglo el index del objeto cuya propiedad id coincida con la que se pasa por argumento, en caso de que no se encuentre la funcion findIndex retorna un -1
                          
        if (index == -1) return (`Id ${productId} no se encuentra, no se pudo actualizar`);          //Si el atributo Id es -1, significa que no fue encontrado al recorrer el arreglo, entonces devuelve este mensaje
        else{

        let newObject = {                                                                            //De otra forma asignamos la informacion pasada por parametro a un objeto nuevo pero conservando el atributo id
            title: newProductInfo.title,
            description: newProductInfo.description,
            code: newProductInfo.code,
            price: newProductInfo.price,
            status: newProductInfo.status,            
            stock: newProductInfo.stock,
            category: newProductInfo.category,
            thumbnails: newProductInfo.thumbnails,
            id: productId
        };  

        fileContentParseado[index] = newObject;                                                     //Se actualiza el objeto en el arreglo con el nuevo objeto
        const fileContentJSON = JSON.stringify(fileContentParseado, 'null', 2);                     //Se cambia el formato del arreglo de objeto a json    
        await fs.promises.writeFile(this.path, fileContentJSON, 'utf-8');                                      //Se escribe el archivo

        return (`Se actualizó el producto con el id ${productId}`);
        }
        }
        catch(error){
            return error
        }
    
    }


    //Elimina del archivo el producto solicitado por su id
    async deleteProduct(productId){

        try{
        console.log("Dentro de deleteProduct");

        let idFind = false;                                                 //Declaramos una variable vacia, se usa como true o false el id a buscar
        
        const fileContent = await fs.promises.readFile(this.path, 'utf-8');            //Leemos el contenido del archivo y lo asignamos a la variable
        const fileContentParseado = JSON.parse(fileContent);                //Convertimos el contenido del archivo de texto a un objeto de js

        fileContentParseado.forEach(element => {
            if (element.id == productId){
                fileContentParseado.splice((productId-1),1);   
                idFind = true;
            }
        });

        if (idFind == false) return (`Id ${productId} no se encuentra, no se pudo eliminar`);          //Si el atributo Id no fue encontrado al recorrer el arreglo devuelve este mensaje

        const fileContentJSON = JSON.stringify(fileContentParseado, 'null', 2);
        await fs.promises.writeFile(this.path, fileContentJSON, 'utf-8');  

        return (`Se eliminó el producto con el id ${productId} del archivo`)
        }
        catch(error){
            return error;
        }
    }
}


module.exports = { ProductManager }             //Importamos la clase ProductManager


