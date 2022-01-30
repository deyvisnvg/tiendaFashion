const express = require('express');
const asyncify = require('express-asyncify');

const router = asyncify(express.Router());

const Controller = require('./controller');
const { configDb } = require('../../config')
const db = require('../../database');
const { handleFatalError } = require('../../error')

let services, Categoria, Producto;

router.use('*', async (req, res, next) => { // (*) cada vez que se haga una petición a todas las rutas // OJO: Actualmente express no soporta midlewares o rutas async await y esto lo solucionamos con express-asyncify me permite darle soporte async await a mi midlewares y rutas de express
    if (!services) { // Si los servicios no han sido obtenidos
        console.log('Connecting to database')

        services = await db(configDb).catch(err => handleFatalError(err)); // Aqui obtengo los servicios de mi BD
        Producto = services.Producto;
        Categoria = services.Categoria;
    }
    next() // Yo necesito siempre llamar a la function de next() para que el midleware continúe la ejecución del request y llegue a las demas rutas
})

router.get('/', (req, res) => {
    Controller.showCategoria(Categoria)
        .then(data => {
            // console.log(data)
            res.render('auth/menuTienda', { data });
        })
        .catch(err => {
            console.log(err.message)
        })
})

router.get('/tiendaProducto/:id', (req, res) => {
    const { id } = req.params;

    Controller.showTiendaProducto(id, Categoria, Producto)
        .then(data => {
            res.render('auth/tiendaProducto', { data });
        })
        .catch(err => {
            console.log(err.message)
        })
})

module.exports = router;