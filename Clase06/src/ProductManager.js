import Contenedor from './Contenedor.js';
import Product from './Product.js';

class ProductManager{
  constructor(path){
    this.path = path
    this.contenedor = new Contenedor(path)
  }

  async addProduct(newProduct){
    let product = new Product(newProduct)
    
    if (product.isValid()){
      await this.contenedor.save(product)
      return product.id
    }
    throw Error("Product is not valid")
  }

  async getProducts(){
    return await this.contenedor.getAll()
  }

  getProductById(id){
    let product = this.contenedor.getByID(id)
    if (product){
      return product
    }
    console.log("Not found")
  }

  async deleteProduct(id){
    return await this.contenedor.deleteById(id)
  }

  async updateProduct(product){
    if (!product.id){
      console.log("Product is not valid for update")
      return
    }

    if(!(await this.getProductById(product.id))){
      console.log("Product does not exist")
      return
    }

    if (!product.isValid()){
      console.log("Product is not valid")
    }
   
    await this.contenedor.deleteById(product.id)
    return await this.contenedor.save(product)
  }
}

export default ProductManager