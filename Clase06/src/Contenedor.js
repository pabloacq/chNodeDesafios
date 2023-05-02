import fs from 'fs';

async function writeToFile(fileContent, fileName){
  await fs.promises.writeFile(fileName, JSON.stringify(fileContent))
}

class Contenedor{
  constructor(filename){
    this.fileName = filename
    this.defaultFileContent = new Array
    this.initialId = 1
  }

  async save(object){
    let fileContent = new Array
    try {
      fileContent = this.getAll() 
      object.id = object.id || this.#getNextID(fileContent)
    } catch (error) {
      this.#catchSaveError(error, object, fileContent)
    }
    fileContent.push(object)
    await writeToFile(fileContent, this.fileName)
    return object.id
  }

  #getNextID(fileContent){
    let lastID = 0 
    fileContent.forEach(object => {
      if (object.id > lastID){
        lastID = object.id
      }
    });
    return lastID+1
  }
  
  #catchSaveError(error, object, fileContent){
    if (error instanceof SyntaxError || error instanceof TypeError){
      fileContent = this.defaultFileContent
      object.id = this.initialId
    }
    else{
      switch (error.errno) {
        case -2: //no such file or directory, open 
          object.id = this.initialId
          break;
        default:
          console.error(error)
          break;
      }
    }
  }

  async getByID(id){
    let fileContent =  this.getAll()
    return fileContent.find(element => element.id == id)
  }

  getAll(){
   return JSON.parse(fs.readFileSync(this.fileName,'utf-8'))
  }

  async deleteById(id){
    let deletedRecord = {}
    let fileContent = this.getAll()
    const indexToDelete = fileContent.findIndex(element => element.id == id)
    
    if (indexToDelete > -1){
      deletedRecord = fileContent.splice(indexToDelete,1)[0]
      await writeToFile(fileContent, this.fileName)
    }

    return deletedRecord
  }

  async deleteAll(){
    const fileContent = new Array
    await writeToFile(JSON.stringify(fileContent), this.fileName)
  }
}

export default Contenedor