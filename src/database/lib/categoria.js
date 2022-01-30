'use strict'

module.exports = CategoriaModel => {

  async function addCategoria(data) {
    return await CategoriaModel.create(data);
  }

  async function findCategoriaAll() {
    return await CategoriaModel.findAll();
  }

  async function findCategoriaActiveAll() {
    return await CategoriaModel.findAll({
      where: {
        estado: 'ACTIVADO'
      },
      raw: true
    })
  }

  async function findCategoriaById(id_categoria) {
    const result = await CategoriaModel.findOne({
      //   attributes: ['id_persona', 'nombres', 'apellidos', 'edad', 'email', 'fecha_nacimiento', 'foto'],
      where: {
        id_categoria
      }
    })
    return result.toJSON();
  }

  /* Componentes: categoria */
  async function updateCategoriaId(id_categoria, categoria) {
    const cond = {
      where: {
        id_categoria
      }
    }

    return await CategoriaModel.update(categoria, cond);
  }

  return {
    addCategoria,
    findCategoriaAll,
    findCategoriaActiveAll,
    findCategoriaById,
    updateCategoriaId
  }
}