class Product{
  constructor({title, description, price, thumbnail, code, stock, id=null}){
    this.title= title
    this.description = description
    this.price = price
    this.thumbnail = thumbnail 
    this.code = code
    this.stock = stock
    this.id = id
  }

  isValid(){
    if (!this.title || !this.description || !this.price || !this.thumbnail || !this.code){
      return false
    }
    return true
  }
}

export default Product