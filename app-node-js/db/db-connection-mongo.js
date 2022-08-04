const mongoose = require('mongoose');
require("dotenv").config();

const getConnection = async () => {
    try {
        console.log('Inicializando llamado a bd');
        await mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true });
        console.log('Base de datos inicializada y conectada');
    } catch(error) {
        console.log('Falló la conexión a la base de datos');
    }
}

module.exports = {
    getConnection,
}