const mongoose = require('mongoose');

const getConnection = async () => {
    try {
        console.log('Inicializando llamado a bd');
        await mongoose.connect('mongodb+srv://charles:charlesdenavidad@cluster0.zi3d91u.mongodb.net/?retryWrites=true&w=majority');
        console.log('Estoy conectado');
    } catch(error) {
        console.log('Fallo la conexión a la base de datos');
    }
}

module.exports = {
    getConnection,
}