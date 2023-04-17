const express = require('express');
const app = express();
const port = 8080;
const expbs = require('express-handlebars');
const path = require('path');

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


// using css

app.use(express.static(path.join(__dirname, 'public')));

// routing 
app.get('/', (req, res) => {
    res.render('index', {
        style: 'home.css',
        title: 'Home',
        name: 'Hello World!',
        isCompleted: true,
        people: [
            { firstName: 'John', lastName: 'Doe' },
            { firstName: 'Jane', lastName: 'Doe' },
            { firstName: 'Joe', lastName: 'Doe' },
        ]
    });
});


app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
});


app.get('/dashboard', (req, res) => {
    res.render('dashboard', {
        title: 'Dashboard',
        isListEnabled: false,
        author: {
            firstName: 'John',
            lastName: 'Doe',
            project: {
                name: 'Project 1',
            }

        }
    });
});


app.get('/each/helper', (req, res) => {
    res.render('contact', {
        people: [
            "John",
            "Jane",
            "Joe",
            "Jill"
        ],
        user: {
            name: "John Doe",
            age: 30,
            email: "test"
        },

        lists: [
            {
                items: ['item1', 'item2', 'item3']
            },
            {
                items: ['list1', 'list2', 'list3']
            },
            {
                items: ['pos1', 'pos2', 'pos3']
            }
        ]

    })
})


app.get('/look', (req, res) => {
    res.render('lookup', {
        user: {
            name: "John Doe",
            age: 30,
            email: "test"
        },
        people: [
            'John',
            'Jane',
            'Joe'
        ]
    });
});



// final command to have the server running

app.listen(port, () => {
    console.log('Server listening on port ' + port);
});



