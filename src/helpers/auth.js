//Este es un objeto con multiples metodos, entre ellos para autenticar a un usuario

const helpers = {};

helpers.isAuthenticated = (req, res, next) => {
    if(req.isAuthenticated()){
        return next();
    }
    req.flash('errors', 'No autorizado');
    res.redirect('/users/ingresar');
};

module.exports = helpers;