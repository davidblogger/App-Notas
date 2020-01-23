//Requerir express para crear rutas
const express = require('express');
const router = express.Router();

const User = require('../models/Users');

const passport = require('passport');

//Renderizar vista para registrar usuario
router.get('/users/registrar', (req, res) => {
    res.render('users/registrar');
});

//Recibir los datos del formulario de registro
router.post('/users/registrar', async (req, res) => {
    const {name, email, password, confirm_password} = req.body;
   
    const errors = [];
    
    if(name.length <= 0){
        errors.push({text: 'Por favor ingresa tu nombre'});
    }

    if(email.length <= 0){
        errors.push({text: 'Por favor ingresa tu email'});
    }

    //Validar que las contraseñas coincidan
    if(password != confirm_password){
        errors.push({text:'Las contraseñas no coinciden'});
    }
    
    //Debe contener al menos 4 caracteres
    if(password.length < 4){
        errors.push({text: 'La contraseña debe contener al menos 4 caracteres'});
    } 
    
    //Renderizar los errores en la vista
    if(errors.length > 0){
        res.render('users/registrar', {errors, name, email, password, confirm_password});
    }else{
       //Verificar si el email ya esta registrado
       const emailUser = await User.findOne({email: email});
       if(emailUser){
           req.flash('errors', 'El email ya se encuentra registrado');
           res.redirect('/users/registrar');
           console.log(email);
       } else {
       //Guarda los datos del usuario en la BD
       const newUser = new User({name, email, password});
       newUser.password = await newUser.encryptPassword(password)
       await newUser.save();
       req.flash('success_msg', 'Has sido registrado, bienvenido ;)');
       res.redirect('/users/ingresar');
       }
    }

   //console.log(req.body);
    
});

router.get('/users/ingresar', (req, res) => {
    res.render('users/ingresar');
});

//Renderizar metodo post para iniciar sesion
router.post('/users/ingresar', passport.authenticate('local', {
    successRedirect: '/notes',
    failureRedirect: '/users/ingresar',
    failureFlash: true
}));


//Ruta para renderizar cierre de sesion
router.get('/users/logout', (req, res) => {
    req.logout();
    res.redirect('/')
});

module.exports = router;