/*Crear Modelo de Datos
Requerimos moongose no para conectarnos a la base de datos, sino que tambien nos sirve para crear
esquemas de datos
*/

const mongoose = require('mongoose');
const { Schema } = mongoose;

const NoteSchema = new Schema({
    Titulo: { type: String, required: true },
    Descripcion: { type: String, required: true },
    date: { type: Date, default: Date.now },
    user: {type: String}
});

//Crear modelo de datos
module.exports = mongoose.model('Note', NoteSchema)