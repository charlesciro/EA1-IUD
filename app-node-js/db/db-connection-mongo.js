const mongoose = require('mongoose');

const getConnection = async () => {
    try {
        console.log('Inicializando llamado a bd');
        await mongoose.connect('mongodb://charlescirot:contraseña@ac-puky1fv-shard-00-00.ifkxtjq.mongodb.net:27017,ac-puky1fv-shard-00-01.ifkxtjq.mongodb.net:27017,ac-puky1fv-shard-00-02.ifkxtjq.mongodb.net:27017/inventario?ssl=true&replicaSet=atlas-ezats4-shard-0&authSource=admin&retryWrites=true&w=majority');
        console.log('Estoy conectado');
    } catch(error) {
        console.log('Fallo la conexión a la base de datos');
    }
}


module.exports = {
    getConnection,
}