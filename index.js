const express = require('express');
const app = express();
const session = require('express-session');

const expbs = require('express-handlebars');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const cookieParser = require('cookie-parser');
const sqliteStore = require('connect-sqlite3')(session) //store for session


// import * as model from './model/index.mjs'
// const model = require('./model/index.js');


const port = process.env.port || 8080;




app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());


// handles the routes
const routes = require('./routes/handlers');



// using css,javascript, images and other public files 
app.use(express.static(path.join(__dirname, 'public')));
// app use node_module 
// app.use('/scripts', express.static(`${__dirname}/node_modules/`));

// app use model 
app.use('/model', express.static(`${__dirname}/model/`));
app.use('/controllers', express.static(`${__dirname}/controllers/`));

app.use(session({
    secret: process.env.secret || "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        sameSite: true,
        maxAge: 60000
    },
    store: new sqliteStore({db: 'session.sqlite',dir: './model/sessions'})
}))


// helpers
const hbs = expbs.create({
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'views/layouts'),
    partialsDir: path.join(__dirname, 'views/partials'),
    extname: '.hbs',

    // create custom helpers
    helpers: require('./controllers/helpers.js'),



});



app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');



app.use(require('./routes/route_about.js'));
app.use(require('./routes/route_book_info.js'));
app.use(require('./routes/route_library_info.js'));
app.use(require('./routes/route_homepage.js'));
app.use(require('./routes/route_search.js'));
app.use(require('./routes/route_sign.js'));
app.use(require('./routes/route_user_profile'))
// app.use(require('./routes/route_status.js'));



// final command to have the server running

app.listen(port, () => {
    console.log('Server listening on port ' + port);
});



