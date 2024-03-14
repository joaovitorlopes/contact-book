exports.middlewareGlobal = (request, response, next) => {
    response.locals.localVariable = 'This the value of local variable.';
    next();
};

exports.otherMiddleware = (request, response, next) => {
    next();
};

exports.checkCsrfError = (error, request, response, next) => {
    if(error && 'EBADCSRFTOKEN' == error.code) {
        return response.render('404');
    }
};

exports.csrfMiddleware = (request, response, next) => {
    response.locals.csrfToken = request.csrfToken();
    next();
};