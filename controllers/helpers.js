const sqlite3 = require('sqlite3').verbose();

module.exports = {
    // use them as {{calculation value}}
    
    // concat function that takes arguments and concats them
    concat: function () {
        let outStr = '';
        for (let arg in arguments) {
            if (typeof arguments[arg] != 'object') {
                outStr += arguments[arg];
            }
        }
        return outStr;
    },

    // encode url 
    encode: function (url) {
        return encodeURI(url);
    },



    bookinfo: function () {
        let db = new sqlite3.Database('model/data.db', sqlite3.OPEN_READONLY, (err) => {
            if (err) {
                console.error(err.message);
            }
            console.log('Connected to the database.');
        });

        let row = {};
        db.each(`Select * from BOOK where title = '${arguments[0]}'`, (err, rows) => {
            if (err) {
                console.log("error")
                console.error(err.message);
            }

            for (i in rows) {
                row[i] = rows[i];
            }

        });

        db.close((err) => {
            if (err) {
                console.error(err.message);
            }
            console.log('Close the database connection.');
        });


        return row;
    },

    booksing: function () {
        // parse the list of isbn given by the user and return the list of books with attributes from bookinfo 
        let book_list = [];
        for (let i=0; i<arguments[0].length; i++) {
            // let this be only the isbn
            // book_list.push(this.bookinfo(arguments[0][i]));
            book_list.push(arguments[0][i]);

        }
        return book_list;
    },

    databaseCommand : function () {
        let command = arguments[0];
        let row = {};

        let db = new sqlite3.Database('model/data.db', (err) => {
            if (err) {
                console.error(err.message);
            }
            console.log(`Connected to the database. ${command}`);
        });

        

        db.each(command, (err, rows) => {
            if (err) {
                console.log("error")
                console.error(err.message);
            }

            // console.log(rows);
            if (rows == undefined) {
                console.log("rows undefined")
                // res.send('Not found');
            }

            for (i in rows) {
                row[i] = rows[i];
            }
            // console.log(rows);
            
        });

        db.close((err) => {
            if (err) {
                console.error(err.message);
            }
            console.log('Close the database connection.');
        });

        return row;
    },
    // redirecting: function()

}