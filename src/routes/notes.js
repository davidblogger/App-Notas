//Requerir express para crear rutas
const express = require('express');
const router = express.Router();

//Requerir Helpers
const { isAuthenticated } = require('../helpers/auth');

//Requerir el archivo Note.js de models/Note.js
const Note = require('../models/Note');

//Agregar una nueva nota
router.get('/notes/add', isAuthenticated, (req, res) => {
    res.render('notes/new-note');
});

//Recibe los datos enviados por el formulario
router.post('/notes/new-note', isAuthenticated, async (req, res) => {
    //La palabra clave async le dice a la funcion newNote que habran procesos asincronos
   
   //Hacer destructurin con los datos enviados por el servidor
   //Para esos datos guardarlos en la base de datos
   const { Titulo, Descripcion } = req.body;
   
   //Enviar mensajes de error
   const errors = [];
   if(!Titulo){
       errors.push({text: 'Por favor escribe un titulo'});
   }
   if(!Descripcion){
    errors.push({text: 'Por favor escribe una descripcion'});
   }
    if(errors.length > 0){
        res.render('notes/new-note', {
            errors,
            Titulo,
            Descripcion
        });
    }else{
       const newNote = new Note({Titulo, Descripcion});
       //console.log(newNote);
       newNote.user = req.user.id;
       await newNote.save(); //Guarda en la base de datos
       req.flash('success_msg', 'Nota agregada con éxito'); //Muestra mensaje que el registro ha sido guardado
       res.redirect('/notes');
       //res.send('ok');

    }

  
});

//Enviar los datos del formulario mediante el METODO POST
router.post('/notes/new-note');


//Vistas de la consulta de la base de datos
router.get('/notes', isAuthenticated, async (req, res) => {
    //res.send('Notas de la base de datos');

    const notes = await Note.find({user:req.user.id}).sort({date:'desc'});
    res.render('notes/all-notes', { notes });
});


//Vistas para editar notas
router.get('/notes/edit/:id', async (req, res) => {
    const note = await Note.findById(req.params.id); //
    res.render('notes/edit-note', {note});
});

//Vistas para actualizar nota seleccionada
router.put('/notes/edit-note/:id', async (req, res) => {
    const {Titulo, Descripcion} = req.body;
    await Note.findByIdAndUpdate(req.params.id, {Titulo, Descripcion});
    req.flash('success_msg', 'Nota actualizada con éxito'); //Mensaje de alerta
    res.redirect('/notes');
});

//Eliminar una nota
router.delete('/notes/delete/:id', async (req, res) => {
    await Note.findByIdAndDelete(req.params.id);
    req.flash('success_msg', 'La nota ha sido borrada'); //Mensaje de alerta
    res.redirect('/notes');
});

module.exports = router;