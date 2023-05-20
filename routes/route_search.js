const express = require('express');

const router = express.Router();

const database = require('../controllers/database.js');
const { type } = require('os');

router.post('/fetchNumOfResults', (req, res) => {
    
    let filters = JSON.stringify(req.body.filters);
    console.log(filters)
    database.getBookInfo(isbn = null, title = req.body.title, numOf=true,copies = null, filters=filters, limit = null,offset=null, function (err, books) {

        if (err) {
            console.log(err)
            console.log(filters,JSON.stringify(books))
            
            res.status(500).send('Internal Server Error Couldnt fetch number of results')

        }
        else {
            // console.log(JSON.stringify(req.body.filters))

            res.send(books);
        }
    })
    // console.log(;)
})


router.post('/fetch_filters', (req, res) => {
    
    let filters = JSON.stringify(req.body.filters);
    database.getBookInfo(isbn = null, title = req.body.title, numOf=false,copies = true, filters=filters, limit = req.body.limit,offset=req.body.offset, function (err, books) {

        if (err) {
            console.log(err)
            res.status(500).send('Internal Server Error')
        }
        else {
            res.send(books);
        }
    })
})


router.get('/fetch_books_all', (req, res) => {
    database.getBookInfo(ibsn = null, title = null, numOf=false,copies = true, filters = null, limit = null,offset=null, function (err, books) {
        if (err) {
            console.log(err)
            res.status(500).send('Internal Server Error')
        }
        else {
            res.send(books);
        }
    })
});



router.get('/fetch_books/:title', (req, res) => {
    database.getBookInfo(isbn = null, title = req.params.title, numOf=false,copies = true, filters = null, limit = null,offset=null, function (err, book) {
        if (err) {
            console.log(err)
            res.status(500).send('Internal Server Error')
        }
        else {
            res.send(book);
        }
    })
});


router.get('/search',
    (req, res, next) => {
        // console.log(req.query.filters)
        if (req.query.filters) {
            res.locals.stringFilters = JSON.stringify(JSON.parse(req.query.filters));
            // console.log(res.locals.stringFilters)
        }
        else {
            res.locals.stringFilters = '';
        }
        // console.log(res.locals.stringFilters)
        next();
    },

    (req, res, next) => {
        database.getAllAttribute('genre', limit=4,offset=null, function (err, attributeList) {
            if (err) {
                console.log(err)
                res.status(500).send('Internal Server Error')
            }
            else {
                res.locals.genre = attributeList;
            }
        });
        next();
    },

    (req, res, next) => {
        database.getAllAttribute('genre', -1,4, function (err, attributeList) {
            if (err) {
                console.log(err)
                res.status(500).send('Internal Server Error')
            }
            else {
                res.locals.all_genre = attributeList;
            }
        });
        next();
    },
    
    (req, res, next) => {
        database.getAllAttribute('publisher',-1,4, function (err, publisherList) {
            if (err) {
                console.log(err)
                res.status(500).send('Internal Server Error')
            }
            else {
                res.locals.all_publisher = publisherList;
            }
        });
        next();
    },

    (req, res, next) => {
        database.getAllAttribute('publisher',4,null, function (err, publisherList) {
            if (err) {
                console.log(err)
                res.status(500).send('Internal Server Error')
            }
            else {
                res.locals.publisher = publisherList;
            }
        });
        next();
    },
    (req, res, next) => {

        database.getAllAttribute('edition', 4,null,function (err, editionList) {
            if (err) {
                console.log(err)
                res.status(500).send('Internal Server Error')
            }
            else {
                res.locals.edition = editionList;
            }
        });
        next();
    },

    (req, res, next) => {

        database.getAllAttribute('edition', -1,4 ,function (err, editionList) {
            if (err) {
                console.log(err)
                res.status(500).send('Internal Server Error')
            }
            else {
                res.locals.all_edition = editionList;
            }
        });
        next();
    },

    (req, res, next) => {
        database.getAllAttribute('language',null,null, function (err, languageList) {
            if (err) {
                console.log(err)
                res.status(500).send('Internal Server Error')
            }
            else {
                res.locals.language = languageList;
            }
        });
        next();
    },

    (req, res, next) => {
        database.getAllAttribute('library',null,null, function (err, libraryList) {
            if (err) {
                console.log(err)
                res.status(500).send('Internal Server Error')
            }
            else {
                res.locals.library = libraryList;
            }
        });
        next();
    },
    // (req, res, next) => {

    // },
    (req, res, next) => {
        res.locals.availability = [
            { name: 'Available' },
            { name: 'Available in more than a week' },
            { name: 'Available this week' },
            { name: 'All' }
        ]

        
        

        next();
    },

    (req, res) => {
        res.render('search', {
            title: 'Search',
        
            signedIn: req.session.signedIn,
            searchBarValue: req.query.search,

        });
    }
);



module.exports = router;


