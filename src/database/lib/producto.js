'use strict'

module.exports = (ProductoModel, CategoriaModel) => {

  async function addProducto(data) {
    return await ProductoModel.create(data);
  }

  async function findProductoAll() {
    return await ProductoModel.findAll({
      include: {
        attributes: ['nombre_categoria'],
        model: CategoriaModel
      },
      // Si un nombre de atributo de la tabla contiene puntos, los objetos resultantes pueden convertirse en objetos anidados configurando la nest: true opción
      raw: true,
      nest: true
    });
  }

  async function findProductoAllById(id_categoria) {
    const result = await ProductoModel.findAll({
      where: {
        id_categoria
      },
      // include: {
      //   attributes: ['nombre_categoria'],
      //   model: CategoriaModel
      // },
      raw: true,
      nest: true
    })
    return result;
  }

  async function findProductoById(id_producto) {
    const result = await ProductoModel.findOne({
      //   attributes: ['id_persona', 'nombres', 'apellidos', 'edad', 'email', 'fecha_nacimiento', 'foto'],
      where: {
        id_producto
      },
      include: {
        attributes: ['nombre_categoria'],
        model: CategoriaModel
      },
      raw: true
    })
    return result;
  }

  /* Componentes: categoria */
  async function updateProducto(id_producto, producto) {
    const cond = {
      where: {
        id_producto
      }
    }

    console.log('producto', producto)

    return await ProductoModel.update(producto, cond);
  }

  return {
    addProducto,
    findProductoAll,
    findProductoAllById,
    findProductoById,
    updateProducto
  }
}