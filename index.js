const express = require('express');
const app = express();
const port = 8080;
const expbs = require('express-handlebars');
const path = require('path');

let signedIn = false;
module.exports = {signedIn };   

// handles the routes
const routes = require('./routes/handlers');

// using css,javascript, images and other public files 
app.use(express.static(path.join(__dirname, 'public')));
// app use node_module 
// app.use('/scripts', express.static(`${__dirname}/node_modules/`));

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



app.use('/', routes)    ;

// final command to have the server running

app.listen(port, () => {
    console.log('Server listening on port ' + port);
});


