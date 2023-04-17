const express = require('express');
const app = express();
const port = 8080;
const expbs = require('express-handlebars');
const path = require('path');

const routes = require('./routes/handlers');

// using css
app.use(express.static(path.join(__dirname, 'public')));

// helpers
const hbs = expbs.create({
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'views/layouts'),
    partialsDir: path.join(__dirname, 'views/partials'),
    extname: '.hbs',

    // create custom helpers
    helpers: {
        // use them as {{calculation value}}
        calculation: function (value) {
            return value + 100;
        },
        list: function (value, options) {
            // return "<h2>"+options.fn({test: value})+"</h2>";
            let out = "<ul>";
            for (let i = 0; i < value.length; i++) {
                // out = out + "<li>"+options.fn({firstName: '',lastName: ''})+"</li>";
                out = out + "<li>" + options.fn(value[i]) + "</li>";
            }
            return out + "</ul>";
        }
    }
});



app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');



app.use('/', routes)    ;

// final command to have the server running

app.listen(port, () => {
    console.log('Server listening on port ' + port);
});



