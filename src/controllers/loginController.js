const Login = require('../models/LoginModel');

exports.index = (request, response) => {
    if(request.session.user) return response.render('login-logged');
    return response.render('login');
};

exports.register = async (request, response) => {

    try {
        const login = new Login(request.body);
        await login.register();

        if (login.errors.length > 0) {
            request.flash('errors', login.errors);
            request.session.save(() => {
                return response.redirect('/login/index');
            });
            return;
        }

        request.flash('success', 'Your account has been created successfully.');
        request.session.save(() => {
            return response.redirect('/login/index');
        });
    } catch (e) {
        console.log(e);
        return response.render('404');
    }
};

exports.signin = async (request, response) => {
    try {
        const login = new Login(request.body);
        await login.signin();

        if(login.errors.length > 0) {
            request.flash('errors', login.errors);
            request.session.save(() => {
                return response.redirect('/login/index');
            });
            return;
        }

        request.flash('sucess', 'Logged in successfully.');
        request.session.user = login.user;
        request.session.save(() => {
            return response.redirect('/login/index');
        })
    } catch(e) {
        console.log(e);
        return response.render('404');
    }
};

exports.logout = (request, response) => {
    request.session.destroy();
    response.redirect('/');
};