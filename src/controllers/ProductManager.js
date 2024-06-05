import {promises as fs} from 'fs'
import  {nanoid}  from 'nanoid';

class ProductManager{
    constructor(){
    this.path = "./src/models/products.json"
}

readProduts = async () =>{
    let products = await  fs.readFile (this.path, "utf-8");
    return JSON.parse(products);

}
writeProducts = async (product) => {
    await fs.writeFile(this.path,JSON.stringify(product));
}

    addProducts = async (product) =>{
        let productsOld = await this.readProduts()
        product.id = nanoid(10)
        let productALL = [...productsOld,product];
        await this.writeProducts(productALL)       
        return "Producto Agregado";
};

getProducts = async () =>{
    return await this.readProduts()

    }
    getProductsById = async (id) =>{
        let productsById = await this.exist(id)
        if (!productsById)
            return "Producto no encontrado"
        return productsById
        }
        
        exist = async (id) =>{

            let products = await this.readProduts()
            return products.find(prod => prod.id === id)

        }

        updateProducts = async (id, product) =>{
            let productsById = await this.exist(id)
            if (!productsById)
            return "Producto no encontrado"
            let productOld = await this.readProduts()
            await this.deleteProduts(id)
            let products = [{...product, id : id},...productOld]
            await this.writeProducts(products) 

        }

        deleteProduts = async  (id)=>{
            let products = await this.readProduts()
            let existProducts = products.some(prod => prod.id === id)
            if (existProducts) {
                let filterProducts = products.filter(prod => prod.id != id)
                await this.writeProducts(filterProducts)
                return "Producto eliminado"
            }
            return "Producto a Eliminar Inexistente"
        }
}


export default ProductManager



