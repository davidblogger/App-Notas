//Conexion a la base de datos MongoDB
//Mongoose sirve para conectarse a la BD

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/notas-db-app', {
    //Configuracion para que no de error por consola la conexion de la BD
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false
})
    //Cuando se conecta ejecuta una promesa
    .then(db => console.log('DB está conectado'))
    .catch(err => console.error(err));