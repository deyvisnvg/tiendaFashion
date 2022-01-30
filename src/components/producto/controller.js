const { handleError } = require('../../error');
const { config } = require('../../config');
const { dateFormatYMD, dateFormatDMY } = require('../../dateFormatUtc');

module.exports = {

    listProducto: function (Producto) {
        return new Promise(async (resolve, reject) => {
            const producto = await Producto.findProductoAll().catch(err => handleError(err));

            // let listProducto = producto.map(prod => {

            //     prod.categoria = prod.categorium.nombre_categoria;
            //     // return {
            //     //     id_producto: prod.id_producto,
            //     //     nombre_producto: prod.nombre_producto,
            //     //     descripcion: prod.descripcion,
            //     //     marca: prod.marca,
            //     //     precio: prod.precio,
            //     //     precio_envio: prod.precio_envio,
            //     //     foto: prod.foto,
            //     //     foto_alternativa: prod.foto_alternativa,
            //     //     fecha_registro: prod.fecha_registro
            //     // }
            //     return prod;
            // })

            // * JSON.stringify: convierte un objeto o valor de JavaScript en una cadena JSON
            // * JSON.parse(): analiza una cadena de texto (string) como JSON y lo convierte a un objeto
            // console.log(JSON.stringify(producto, null, 2));
            // console.log(JSON.parse(JSON.stringify(producto)));
            // producto2 = JSON.parse(JSON.stringify(producto));

            // console.log(listProducto)
            resolve(producto);
        })
    },

    editProducto: function (id_producto, Producto, Categoria) {
        return new Promise(async (resolve, reject) => {
            try {
                let producto = await Producto.findProductoById(id_producto).catch(err => handleError(err));
                const categoria = await Categoria.findCategoriaActiveAll().catch(handleError);

                producto.nombre_categoriaFormat = producto['categorium.nombre_categoria'];

                let dataProducto = {
                    producto,
                    categoria
                }
                resolve(dataProducto);
                // console.log(producto);
            } catch (err) {
                reject('[Error!]:', err);
            }

        })
    },

    updateProducto: function (id_producto, body, files, Producto) {
        return new Promise(async (resolve, reject) => {
            // console.log(body)
            // console.log(files)
            let ruteFoto, ruteFoto_alternativa;
            
            let dataProducto = {
                nombre_producto: body.nombre_producto,
                descripcion: body.descripcion,
                marca: body.marca,
                precio: body.precio,
                precio_envio: body.precio_envio,
                // foto: ruteFoto,
                // foto_alternativa: ruteFoto_alternativa,
                // fecha_registro: body.fecha_registro,
                id_categoria: body.categoria
            }

            if (files.length != 0) {
                files.map(file => {
                    if (file.fieldname == "image") {
                        dataProducto.foto = config.filesRouteImg + '/' + file.originalname;
                    }
                    if (file.fieldname == "image2") {
                        dataProducto.fotoDetalle = config.filesRouteImg + '/' + file.originalname; 
                    }
                    if (file.fieldname == "image3") {
                        dataProducto.foto_alternativa = config.filesRouteImg + '/' + file.originalname;
                    }
                })

                // if (files.length < 2) {
                //     ruteFoto = config.filesRouteImg + '/' + files[0].originalname;
                //     dataProducto.foto = ruteFoto;
                // } else {
                //     ruteFoto = config.filesRouteImg + '/' + files[0].originalname;
                //     ruteFoto_alternativa = config.filesRouteImg + '/' + files[1].originalname;

                //     dataProducto.foto = ruteFoto;
                //     dataProducto.foto_alternativa = ruteFoto_alternativa;
                // }
            }

            if (dataProducto.marca == '') {
                dataProducto.marca = 'personalizado';
            }

            try {
                await Producto.updateProducto(id_producto, dataProducto).catch(handleError);
                resolve(dataProducto.nombre_producto);
            } catch (err) {
                reject("Error! al modificar, Inténtelo nuevamente.");
            }
        })
    },

    listCategoria: function (Categoria) {
        return new Promise(async (resolve, reject) => {
            const categoria = await Categoria.findCategoriaActiveAll().catch(handleError);
            // console.log(categoria)
            resolve(categoria);
        })
    },

    addProducto: function (files, body, Producto) {
        return new Promise(async (resolve, reject) => {
            let ruteFoto, ruteFoto_alternativa, ruteFoto_detalle;
            // console.log(files.length)

            if (files.length < 3) {
                ruteFoto = config.filesRouteImg + '/' + files[0].originalname;
                ruteFoto_detalle = config.filesRouteImg + '/' + files[1].originalname;
                ruteFoto_alternativa = config.filesRouteImg + '/' + 'sin_imagen.jpg';
            } else {
                ruteFoto = config.filesRouteImg + '/' + files[0].originalname;
                ruteFoto_detalle = config.filesRouteImg + '/' + files[1].originalname;
                ruteFoto_alternativa = config.filesRouteImg + '/' + files[2].originalname;
            }

            if (body.descripcion == '') {
                body.descripcion = body.nombre_producto;
            }

            if (body.marca == '') {
                body.marca = 'personalizado';
            }

            let newProducto = {
                id_producto: body.id_producto,
                nombre_producto: body.nombre_producto,
                descripcion: body.descripcion,
                marca: body.marca,
                precio: body.precio,
                precio_envio: body.precio_envio,
                // foto: ruteFoto,
                // fotoDetalle: ruteFoto_detalle,
                // foto_alternativa: ruteFoto_alternativa,
                // codigo: body.codigo,
                fecha_registro: dateFormatYMD(),
                id_categoria: body.categoria
            }

            if (files.length != 0) {
                files.map(file => {
                    if (file.fieldname == "image") {
                        newProducto.foto = config.filesRouteImg + '/' + file.originalname;
                    }
                    if (file.fieldname == "image2") {
                        newProducto.fotoDetalle = config.filesRouteImg + '/' + file.originalname;
                    }
                    if (file.fieldname == "image3") {
                        newProducto.foto_alternativa = config.filesRouteImg + '/' + file.originalname;
                    }
                })
            }

            if (typeof newProducto.foto_alternativa == 'undefined') {
                newProducto.foto_alternativa = config.filesRouteImg + '/' + 'sin_imagen.jpg';
            }

            // console.log(newProducto)

            try {
                await Producto.addProducto(newProducto).catch(handleError);
                resolve(newProducto.nombre_producto);
            } catch (error) {
                reject("[Error!]: al agregar, Inténtelo nuevamente.");
            }
        })
    }
}