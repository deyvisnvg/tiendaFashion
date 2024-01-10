'use strict'

const Sequelize = require('sequelize');
const db = require('../lib/db');

module.exports = function setupUsuarioModel(config) {
    const sequelize = db(config);

    return sequelize.define('categoria', {
        id_categoria: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        nombre_categoria: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        estado: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        logo: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        fecha_registro: {
            type: Sequelize.TEXT,
            allowNull: false
        }
    },
        {
            timestamps: false, // Esto es para que no tenga problemas con las fechas.
            freezeTableName: true
        })
}