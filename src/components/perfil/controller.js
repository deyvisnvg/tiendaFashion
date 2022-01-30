const { handleError } = require('../../error');
const { config } = require('../../config')

module.exports = {
    showPerfil: (id, Persona) => {
        return new Promise(async (resolve, reject) => {
            const perfil = await Persona.findPersonaIdUser(id).catch(err => handleError(err));
            resolve(perfil);
        })
    },

    editPersona: (id, Persona) => {
        return new Promise(async (resolve, reject) => {
            const perfilPersona = await Persona.findPersonaId(id).catch(err => handleError(err));
            resolve(perfilPersona);
        })
    },

    updatePersona: (id, files, persona, Persona) => {
        return new Promise(async (resolve, reject) => {
            let nameFoto;

            if (files.length == 1) {
                nameFoto = config.filesRouteImg + '/' + files[0].originalname;
            } else {
                nameFoto = persona.foto;
            }

            const dataPersona = {
                nombres: persona.nombres,
                apellidos: persona.apellidos,
                edad: persona.edad,
                email: persona.email,
                fecha_nacimiento: persona.fecha_nacimiento,
                foto: nameFoto
            }

            const updatePersona = await Persona.updatePersonaId(id, dataPersona).catch(err => handleError(err));
            resolve(updatePersona);
        })
    }

}