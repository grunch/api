'use strict'
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(cors())
//configurar cabeceras http
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin','*')
    res.header('Access-Control-Allow-Headers','Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method')
    res.header('Access-Control-Allow-Methods','GET, POST, OPTIONS, PUT, DELETE')
    res.header('Allow','GET, POST, OPTIONS, PUT, DELETE')
    next()
  })
// cargar rutas 
let coin_routes = require('./src/coin/coin.router')
let historic_coin_routes = require('./src/historic-coin/historic-coin.router')
// ruta base
app.use(coin_routes)
app.use(historic_coin_routes)

module.exports = app