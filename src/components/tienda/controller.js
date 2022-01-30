const { handleError } = require('../../error');

module.exports = {
    showCategoria: Categoria => {
        return new Promise(async (resolve, reject) => {
            const categoria = await Categoria.findCategoriaAll().catch(err => handleError(err));

            let listCategoria = categoria.map(catg => {
                return {
                    id_categoria: catg.id_categoria,
                    nombre_categoria: catg.nombre_categoria,
                    logo: catg.logo
                    // estado: catg.estado,
                    // fecha_registro: catg.fecha_registro
                }
            })

            resolve(listCategoria);
        })
    },

    showTiendaProducto: (id, Categoria, Producto) => {
        return new Promise(async (resolve, reject) => {
            let dataCategoria = id.split(" ");

            let categ = {
                id_categoria: dataCategoria[0],
                nombre_categoria: dataCategoria[1]
            }

            const producto = await Producto.findProductoAllById(categ.id_categoria).catch(handleError);

            // let listProducto = producto.map(prod => {
            //     return {
            //         id_producto: prod.id_producto,
            //         nombre_producto: prod.nombre_producto,
            //         descripcion: prod.descripcion,
            //         marca: prod.marca,
            //         precio: prod.precio,
            //         precio_envio: prod.precio_envio,
            //         foto: prod.foto,
            //         foto_alternativa: prod.foto_alternativa,
            //         codigo: prod.codigo,
            //         fecha_registro: prod.fecha_registro,
            //         // nombre_categoria: prod['categorium.nombre_categoria']
            //     }
            // })

            let data = {
                producto,
                nombre_categoria: categ.nombre_categoria
            };

            console.log(data)
            resolve(data);
        })
    }
}