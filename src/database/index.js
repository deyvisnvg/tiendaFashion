'use strict'

const db = require('./lib/db');
const setupUsuarioModel = require('./models/usuario');
const setupPersonaModel = require('./models/persona');
const setupProductoModel = require('./models/producto');
const setupCategoriaModel = require('./models/categoria');

const setupUsuario = require('./lib/usuario');
const setupPersona = require('./lib/persona');
const setupProducto = require('./lib/producto');
const setupCategoria = require('./lib/categoria');

module.exports = async config => {

    const sequelize = db(config);
    const UsuarioModel = setupUsuarioModel(config);
    const PersonaModel = setupPersonaModel(config);
    const ProductoModel = setupProductoModel(config);
    const CategoriaModel = setupCategoriaModel(config);

    //--------------------------- Usuario - Persona ---------------------------//
    UsuarioModel.hasOne(PersonaModel, { foreignKey: 'id_usuario', sourceKey: 'id_usuario' }) // Un "Usuario" "Tiene una" "Persona"
    PersonaModel.belongsTo(UsuarioModel, { foreignKey: 'id_usuario', sourceKey: 'id_usuario' }) // Una persona "Pertenece a" un "Usuario"

    //--------------------------- Persona - Producto ---------------------------//
    PersonaModel.hasMany(ProductoModel, { foreignKey: 'id_persona', sourceKey: 'id_persona' }) // Una Persona 'tiene muchas' Productos registrados
    ProductoModel.belongsTo(PersonaModel, { foreignKey: 'id_persona', sourceKey: 'id_persona' }) // Uno y muchas "Producto" "Pertenece a" un "Persona"

    //--------------------------- Producto - Categoria ---------------------------//
    CategoriaModel.hasMany(ProductoModel, { foreignKey: 'id_categoria', sourceKey: 'id_categoria' }) // Una Categoria 'tiene muchas' Productos registrados
    ProductoModel.belongsTo(CategoriaModel, { foreignKey: 'id_categoria', sourceKey: 'id_categoria' }) // Uno y muchas "Producto" "Pertenece a" una "Categoria"

    
    await sequelize.authenticate() //Validamos que la base de datos esta bien configurada, para verificar si hay una conexion directa con la base de datos

    const Usuario = setupUsuario(UsuarioModel, PersonaModel);
    const Persona = setupPersona(PersonaModel, UsuarioModel);
    const Producto = setupProducto(ProductoModel, CategoriaModel);
    const Categoria = setupCategoria(CategoriaModel);

    return {
        Usuario,
        Persona,
        Producto,
        Categoria
    }
}