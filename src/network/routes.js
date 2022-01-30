'use strict'

const authentication = require('../components/authentication/network');
const menuTienda = require('../components/tienda/network');
const usuario = require('../components/user/network');
const producto = require('../components/producto/network');
const categoria = require('../components/categoria/network');
const perfil = require('../components/perfil/network');

module.exports = app => {
    app.use('/login', authentication);
    app.use('/menuTienda', menuTienda)
    app.use('/usuario', usuario);
    app.use('/producto', producto);
    app.use('/categoria', categoria);
    app.use('/perfil', perfil);
}