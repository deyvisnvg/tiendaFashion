const { handleError } = require('../../error');
const { config } = require('../../config');
const { dateFormatYMD, dateFormatDMY } = require('../../dateFormatUtc');

module.exports = {

    listCategoria: function (Categoria) {
        return new Promise(async (resolve, reject) => {
            const categoria = await Categoria.findCategoriaAll().catch(err => handleError(err));

            let listCategoria = categoria.map(catg => {
                return {
                    id_categoria: catg.id_categoria,
                    nombre_categoria: catg.nombre_categoria,
                    estado: catg.estado,
                    fecha_registro: catg.fecha_registro
                }
            })

            resolve(listCategoria);
        })
    },

    editCategoria: function (id_categoria, Categoria) {
        return new Promise(async (resolve, reject) => {
            try {
                const categoria = await Categoria.findCategoriaById(id_categoria).catch(err => handleError(err));
                // console.log(categoria)
                resolve(categoria);
            } catch (err) {
                reject('[Error!]:', err);
            }

        })
    },

    updateCategoria: function (id_categoria, files, body, Categoria) {
        return new Promise(async (resolve, reject) => {
            const dataCategoria = {
                nombre_categoria: body.nombre_categoria,
                estado: body.estado,
            }

            if (files.length == 1) {
                dataCategoria.logo = config.filesRouteImg + '/' + files[0].originalname;
            }

            try {
                await Categoria.updateCategoriaId(id_categoria, dataCategoria);
                resolve();
            } catch (err) {
                reject("[Error!]: al modificar, Inténtelo nuevamente.");
            }
        })
    },

    configuration: function () {
        return new Promise(async (resolve, reject) => {
            let fecha_registro = dateFormatYMD();
            resolve(fecha_registro);
        })
    },

    addCategoria: function (files, body, Categoria) {
        return new Promise(async (resolve, reject) => {
            const newCategoria = {
                nombre_categoria: body.nombre_categoria.toUpperCase(),
                estado: body.estado.toUpperCase(),
                fecha_registro: body.fecha_registro
            }

            if (files.length == 1) {
                newCategoria.logo = config.filesRouteImg + '/' + files[0].originalname;
            }

            await Categoria.addCategoria(newCategoria).catch(handleError);
            resolve(newCategoria.nombre_categoria);
        })
    }
}