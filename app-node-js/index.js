const express = require('express');
require("dotenv").config();
const { getConnection } = require('./db/db-connection-mongo');
const cors = require('cors')

const app = express();
app.use(cors())

getConnection();

const inventario = require('./rutas/inventario');
const usuario = require('./rutas/usuario');
const marca = require('./rutas/marca');
const tipoEquipo = require('./rutas/tipoEquipo');
const estadoEquipo = require('./rutas/estadoEquipo');

const PORT = process.env.PORT || 4000;

// Json parse
app.use(express.json());

app.use('/usuario', usuario); // http://localhost:4000/usuario GET, POST, PUT
app.use('/marca', marca); // http://localhost:4000/usuario GET, POST, PUT
app.use('/tipoEquipo', tipoEquipo); // http://localhost:4000/tipoEquipo GET, POST, PUT
app.use('/inventario', inventario); // http://localhost:4000/inventario GET, POST, PUT
app.use('/estadoEquipo', estadoEquipo); // http://localhost:4000/estadoEquipo GET, POST, PUT


app.listen(PORT, function() {
    console.log('Aplicacion corriendo en el puerto 4000');
});


