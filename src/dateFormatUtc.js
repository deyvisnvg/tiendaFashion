'use strict'

const moment = require('moment');

const formatDate = {};

formatDate.dateFormatYMD = () => {
    // var dateFormat = 'YYYY-MM-DD HH:mm:ss';
    var dateFormat = 'YYYY-MM-DD';
    var dateUtc = moment().utcOffset("-05:00");

    let fecha = dateUtc.format(dateFormat);
    return fecha;
}

formatDate.dateFormatDMY = (fecha) => {
    var dateFormat = 'DD-MM-YYYY';
    var dateUtc = moment(fecha);
    fecha = dateUtc.format(dateFormat);

    return fecha;
}

formatDate.dateFormatYMDTime = () => {
    // var dateFormat = 'YYYY-MM-DD HH:mm:ss';
    var dateFormat = 'YYYY-MM-DD HH:mm:ss';
    var dateUtc = moment().utcOffset("-05:00");

    let fecha = dateUtc.format(dateFormat);
    return fecha;
}

// formatDate.dateFormatHms = () => {
//     var dateFormat = 'HH:mm:ss';
//     // var dateFormat = 'LTS';
//     var dateUtc = moment().utcOffset("-05:00");

//     let hora = dateUtc.format(dateFormat);
//     return hora;
// }

// formatDate.dateFormatYMD_add = () => {
//     // var dateFormat = 'YYYY-MM-DD HH:mm:ss';
//     var dateFormat = 'YYYY-MM-DD';
//     var dateUtc = moment().utcOffset("-05:00");

//     let fecha = dateUtc.add(22, 'days');
//     fecha = fecha.format(dateFormat);

//     return fecha;
// }

// formatDate.dateFormatYMD_add2 = () => {
//     // var dateFormat = 'YYYY-MM-DD HH:mm:ss';
//     var dateFormat = 'YYYY-MM-DD';
//     var dateUtc = moment().utcOffset("-05:00");

//     let fecha = dateUtc.add(25, 'days');
//     fecha = fecha.format(dateFormat);

//     return fecha;
// }

module.exports = formatDate;