// const Contenedor = require('./Contenedor')
// const Utils = require('./Utils')
// const express = require('express')
// const app = express()

import express from 'express';
import ProductManager from './ProductManager.js'
import bodyParser from 'body-parser'

const app = express()

const PORT = 8080

const products = new ProductManager('DB/products.json')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get('/', (req, res) => {
  res.json({mensaje:'Nada por aqui', })
})

app.get('/products', async (req, res) => {
  let limit = req.query.limit
  if (limit && isNaN(limit))
  {
    res.status(400)
    res.send({data: "Limit tiene que ser un numero entero"})
    return
  }

  if (!limit){
    res.json(await products.getProducts())
    return
  }
  res.json((await products.getProducts()).slice(-limit))
})

app.get('/products/:pid', async (req, res) => {
  const ID = req.params.pid
  res.json(await products.getProductById(ID))
})

const server = app.listen(PORT, ()=>{
  console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})

server.on('error', error => console.log(`Error en el servidor ${error}`))
