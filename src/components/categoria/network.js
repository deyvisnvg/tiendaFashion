const express = require('express');
const asyncify = require('express-asyncify');

const router = asyncify(express.Router());

const secure = require('../../auth');
const Controller = require('./controller');
const { configDb } = require('../../config')
const db = require('../../database');
const { handleFatalError } = require('../../error')

let services, Categoria;

router.use('*', async (req, res, next) => { // (*) cada vez que se haga una petición a todas las rutas // OJO: Actualmente express no soporta midlewares o rutas async await y esto lo solucionamos con express-asyncify me permite darle soporte async await a mi midlewares y rutas de express
    if (!services) { // Si los servicios no han sido obtenidos
        console.log('Connecting to database')

        services = await db(configDb).catch(err => handleFatalError(err)); // Aqui obtengo los servicios de mi BD
        Categoria = services.Categoria
    }
    next() // Yo necesito siempre llamar a la function de next() para que el midleware continúe la ejecución del request y llegue a las demas rutas
})

router.get('/', secure.checkOwn, (req, res) => {
    const user = req.session.user;
    req.session.success = "";
    req.session.message = "";

    Controller.listCategoria(Categoria)
        .then(data => {
            res.render('links/listCategoria', { data, user });
        })
        .catch(err => {
            console.log('[Error!]: ', err);
        })
})

router.get('/edit/:id', (req, res) => {
    const user = req.session.user;
    const { id } = req.params;

    Controller.editCategoria(id, Categoria)
        .then(data => {
            res.render('links/editCategoria', { data, user });
        })
        .catch(err => {
            console.log(err.message);
        })
})

router.post('/update/:id', (req, res) => {
    const { id } = req.params;

    Controller.updateCategoria(id, req.files, req.body, Categoria)
        .then(() => {
            req.session.success = "La Categoría se ha modificado con exito";
            res.redirect('/categoria');
        })
        .catch(err => {
            console.error(err.message);
            req.session.message = err;
            res.redirect('/categoria');
        })
})

router.get('/add', secure.checkOwn, (req, res) => {
    const user = req.session.user;
    req.session.success = "";
    req.session.message = "";

    Controller.configuration()
        .then(fecha_registro => {
            res.render('links/addCategoria', { fecha_registro, user });
        })
        .catch(err => {
            req.session.message = err;
            res.redirect('/categoria');
        })


})

router.post('/add', (req, res) => {
    Controller.addCategoria(req.files, req.body, Categoria)
        .then(nombre_categoria => {
            req.session.success = `Categoría ${nombre_categoria} registrado con éxito!`;
            res.redirect('/categoria/add');
        })
        .catch(err => {
            req.session.message = err;
            res.redirect('/categoria/add');
        })
})

module.exports = router;