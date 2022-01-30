'use strict'

const Sequelize = require('sequelize');
const db = require('../lib/db');

module.exports = function setupProductoModel(config) {
    const sequelize = db(config);

    return sequelize.define('producto', {
        id_producto: {
            type: Sequelize.TEXT,
            primaryKey: true
        },
        nombre_producto: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        descripcion: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        marca: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        precio: {
            type: Sequelize.TEXT
        },
        precio_envio: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        foto: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        fotoDetalle: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        foto_alternativa: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        // codigo: {
        //     type: Sequelize.TEXT,
        //     allowNull: false
        // },
        fecha_registro: {
            type: Sequelize.DATE,
            allowNull: false
        },
        id_persona: {
            type: Sequelize.INTEGER
        },
        id_categoria: {
            type: Sequelize.INTEGER
        }
    },
    {
        timestamps: false,
        freezeTableName: true
    })
}