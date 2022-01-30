const express = require('express');
const asyncify = require('express-asyncify');

const router = asyncify(express.Router());

const secure = require('../../auth');
const Controller = require('./controller');
const { configDb } = require('../../config')
const db = require('../../database');
const { handleFatalError } = require('../../error')

let services, Producto, Categoria;

router.use('*', async (req, res, next) => { // (*) cada vez que se haga una petición a todas las rutas // OJO: Actualmente express no soporta midlewares o rutas async await y esto lo solucionamos con express-asyncify me permite darle soporte async await a mi midlewares y rutas de express
    if (!services) { // Si los servicios no han sido obtenidos
        console.log('Connecting to database')

        services = await db(configDb).catch(err => handleFatalError(err)); // Aqui obtengo los servicios de mi BD
        Producto = services.Producto
        Categoria = services.Categoria
    }
    next() // Yo necesito siempre llamar a la function de next() para que el midleware continúe la ejecución del request y llegue a las demas rutas
})


router.get('/', secure.checkOwn, (req, res) => {
    const user = req.session.user;

    res.render('links/bienvenida', { user });

})

router.get('/product', secure.checkOwn, (req, res) => {
    const user = req.session.user;
    req.session.success = "";
    req.session.message = "";

    Controller.listProducto(Producto)
        .then(data => {
            res.render('links/listProducto', { data, user });
        })
        .catch(err => {
            console.log('[Error!]: ', err);
        })
})

router.get('/edit/:id', (req, res) => {
    const user = req.session.user;
    const { id } = req.params;

    Controller.editProducto(id, Producto, Categoria)
        .then(data => {
            res.render('links/editProducto', { data, user });
        })
        .catch(err => {
            console.log(err.message);
        })
})

router.post('/update/:id', (req, res) => {
    const { id } = req.params;

    Controller.updateProducto(id, req.body, req.files, Producto)
        .then(nombre_producto => {
            req.session.success = `El Producto '${nombre_producto}' se ha modificado con exito`;
            res.redirect('/producto/product');
        })
        .catch(err => {
            console.error('[Error!]:', err);
            req.session.message = err;
            res.redirect('/producto/product');
        })
})

router.get('/add', secure.checkOwn, (req, res) => {
    const user = req.session.user;
    req.session.success = "";
    req.session.message = "";

    Controller.listCategoria(Categoria)
        .then(data => {
            res.render('links/addProducto', { data, user });
        })
        .catch(err => {
            console.log('[Error!]: ', err);
        })
})

router.post('/add', (req, res) => {
    // console.log(req.body)
    // console.log(req.files)
    Controller.addProducto(req.files, req.body, Producto)
        .then(nombre_producto => {
            req.session.success = `El Producto '${nombre_producto}' se registró con éxito!`;
            res.redirect('/producto/add');
        })
        .catch(err => {
            req.session.message = err;
            res.redirect('/producto/add');
        })
})

module.exports = router;