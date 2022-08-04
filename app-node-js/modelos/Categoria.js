const { Schema, model } = require('mongoose');

const CategoriaSchema = Schema({
	id: {
        type: Number,
        required: true,
        unique: true,
    },
    nombre: {
        type: String,
        required: true,
    }
});

module.exports = model('Categoria', CategoriaSchema);

