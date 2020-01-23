//Constantes
const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');


//Inicializaciones
const app = express();
    //Inicializar la base de datos
    require('./database');
    //Requerir Passport
    require('./config/passport');

//Configuraciones
app.set('port', process.env.POST || 4000);
    //Decirle a Node donde se encuentra la carpeta views
    app.set('views', path.join(__dirname, 'views'));
    //Configurar Handlerbars
    app.engine('.hbs', exphbs({
        defaultLayaout: 'main',
        layaoutDir: path.join(app.get('views'), 'layouts'),
        partialsDir: path.join(app.get('views'), 'partials'),
        extname: '.hbs'
    }));
    //Esta linea sirve para configurar el motor de plantillas
    app.set('view engine', '.hbs');



//Middlewares
app.use(express.urlencoded({extended: false})); //Metodo de express para entender cuando un formulario envie determinado dato
app.use(methodOverride('_method')); //Sirve para que los formularios puedan enviar otros tipos de metodos
app.use(session({
    secret: 'mysecretapp',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash()); //Para mandar los mensajes en Pantalla

//Variables globales
//Hacer una variable global para almacenar mensajes flash disponibles para toda la app
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null; 

    next();
});

//rutas del servidor
app.use(require('./routes/index'));
app.use(require('./routes/notes'));
app.use(require('./routes/users'));

//Archivos Estaticos
app.use(express.static(path.join(__dirname, 'public'))); //Configurar los archivos estaticos de la carpeta public


//Servidor esta escuchando
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});