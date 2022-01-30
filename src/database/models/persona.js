'use strict'

const Sequelize = require('sequelize');
const db = require('../lib/db');

module.exports = function setupPersonaModel(config) {
    const sequelize = db(config);

    return sequelize.define('persona', {
        id_persona: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        nombres: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        apellidos: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        edad: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        email: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        fecha_nacimiento: {
            type: Sequelize.DATE,
            allowNull: false
        },
        foto: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        id_usuario: {
            type: Sequelize.TEXT
        }
    },
    {
        timestamps: false, // Esto es para que no tenga problemas con las fechas.
        freezeTableName: true
    })
}