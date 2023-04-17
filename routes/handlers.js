// routing
const express = require('express');
const router = express.Router();



router.get('/', (req, res) => {
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


router.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
});


router.get('/dashboard', (req, res) => {
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


router.get('/each/helper', (req, res) => {
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


router.get('/look', (req, res) => {
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


module.exports = router;
