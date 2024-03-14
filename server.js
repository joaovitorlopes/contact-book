// environment variables
require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
// mongoose -> modeling the database(schema)
mongoose.connect(process.env.CONNECTIONSTRING)
    .then(() => {
        app.emit('ready'); // send the ready signal
    })
    .catch(e => console.log(e));
const session = require('express-session'); // identify the client web browser (cookie)
const MongoStore = require('connect-mongo'); // save sessions in database
const flash = require('connect-flash'); // self-destructing messages after reading (feedback)
const routes = require('./routes'); // aplication routes
const path = require('path');
const helmet = require('helmet'); // security of aplication
const csrf = require('csurf'); // csrf tokens for forms (security)

// importing middlewares -> functions that are performed on routes
const { middlewareGlobal, checkCsrfError, csrfMiddleware } = require('./src/middlewares/middleware');

app.use(helmet());
//Handling POST method
app.use(express.urlencoded({ extended: true })); //POST forms in application
app.use(express.json()); // JSON parsing for application
app.use(express.static(path.resolve(__dirname, 'public'))); // Acess static files in application (img, css, js)

// -- CONFIGS --
const sessionOptions = session({
    secret: '9iN5lUz1Ewr7eSiXP1vxVw6MkiEvab7DJKg1w6ArKylgAEPHuf',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true
    },
    store: MongoStore.create({ mongoUrl: process.env.CONNECTIONSTRING })
});

app.use(sessionOptions);
app.use(flash());

app.set('views', path.resolve(__dirname, 'src', 'views')); // render files
app.set('view engine', 'ejs'); // engine to render html

app.use(csrf()); // csrf tokens
// Our own middleware
app.use(middlewareGlobal);
app.use(checkCsrfError);
app.use(csrfMiddleware);
// calling routes
app.use(routes);

// ready to listen requests
app.on('ready', () => {
    app.listen(5000, () => {
        console.log('The server has been started in the port 5000');
        console.log('Acess http://localhost:5000 or http://127.0.0.1:5000');
    });
});