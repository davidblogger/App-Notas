const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/Users');

//Validar email y contraseña
passport.use(new LocalStrategy({
    usernameField: 'email'
}, async (email, password, done) => {
    const user = await User.findOne({email: email});
    if(!user){
        return done(null, false, {message: 'Usuario no registrado'});
    }else{
        const match = await user.matchPassword(password);
        if(match){
           return done(null, user); 
        }else{
            return done(null, false, {message: 'Contraseña incorrecta'});
        }
    }
}));


//Toma un usuario y toma un callback, cuando un usuario de autentique se almacena en una sesion el id del 
//usuario
passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) =>{
    User.findById(id, (err, user) =>{
        done(err, user);
    });
});

