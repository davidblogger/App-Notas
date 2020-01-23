//Requerir express para crear rutas
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index'); //Como respuesta renderiza el archivo index.hbs que se encuentra en la carpeta views
});

router.get('/about', (req, res) => {
    res.render('about'); //Como respuesta renderiza el archivo about.hbs que se encuentra en la carpeta views
});

module.exports = router;