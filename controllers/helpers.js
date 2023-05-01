const sqlite3 = require('sqlite3').verbose();

module.exports = {
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
    },

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

    // supposes returns an object with the book properties
    booking: function () {

        let outStr = 'Test';

        let db = new sqlite3.Database('./docs/database/SQL/data.db', sqlite3.OPEN_READONLY, (err) => {
            if (err) {
                outStr+='error';
            }
            // console.log('Connected to the database.');
            outStr+= 'connected';
        });
        return outStr;
    },

    // encode url 
    encode: function (url) {
        return encodeURI(url);
    },



    bookinfo: function (isbn) {
        let db = new sqlite3.Database('model/data.db', sqlite3.OPEN_READONLY, (err) => {
            if (err) {
                console.error(err.message);
            }
            console.log('Connected to the database.');
        });

        let row 
        db.each(`Select * from BOOK where title = '${isbn}'`, (err, rows) => {
            if (err) {
                console.log("error")
                console.error(err.message);
            }

            for (let i = 0; i < rows.length; i++) {
                row = rows[i];
            }
            console.log(row);
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