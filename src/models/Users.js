const mongoose = require('mongoose');
const { Schema } = mongoose;
    //Modulo para cifrar contraseñas
    const bcrypt = require('bcryptjs');

const UserSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: { type: String, required: true},
    date: {type: Date, default: Date.now}
});

//Encriptar password
UserSchema.methods.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hash = bcrypt.hash(password, salt);
    return hash;
};

//Comparar contraseñas de la base  de datos con la ingresada por el usuario
UserSchema.methods.matchPassword = async function (password){
    return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', UserSchema);