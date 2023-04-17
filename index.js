const express = require('express');
const app = express();
const port = 8080;
const expbs = require('express-handlebars');
const path = require('path');



app.engine('handlebars', expbs.engine({
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'views/layouts'),
    partialsDir: path.join(__dirname, 'views/partials')
}));
app.set('view engine', 'handlebars');


// routing 
app.get('/', (req, res) => {
    res.render('index', {
        title: 'Home',
        name: 'Hello World!',
        isCompleted: true,
    });
});


app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
});


app.get('/dashboard', (req, res) => {
    res.render('dashboard', {
        title: 'Dashboard',
        isListEnabled: false
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


app.listen(port, () => {
    console.log('Server listening on port ' + port);
});



