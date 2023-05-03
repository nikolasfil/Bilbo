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
        // connects to the database, executed the given command (arguments[0]) and returns the row that holds the result
        let command = arguments[0];
        let row = {};

        // model is a public folder for node 

        let db = new sqlite3.Database('model/data.db', (err) => {
            if (err) {
                console.error(err.message);
            }
            // this is for debugging reasons, can be removed
            // see if we can change it with status
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

            // assign the rows to the row variable so that we can return it 
            for (i in rows) {
                row[i] = rows[i];
            }
            
        });

        // close the database to avoid errors
        db.close((err) => {
            if (err) {
                console.error(err.message);
            }
            console.log('Close the database connection.');
        });

        return row;
    },


    databaseAllCommand : function () {
        // connects to the database, executed the given command (arguments[0]) and returns the row that holds the result
        let command = arguments[0];
        let row = {};

        // model is a public folder for node 

        let db = new sqlite3.Database('model/data.db', (err) => {
            if (err) {
                console.error(err.message);
            }
            // this is for debugging reasons, can be removed
            // see if we can change it with status
            console.log(`Connected to the database. ${command}`);
        });

        

            db.all(command, (err, rows) => {
            if (err) {
                console.log("error")
                console.error(err.message);
            }

            // console.log(rows);
            if (rows == undefined) {
                console.log("rows undefined")
                // res.send('Not found');
            }

            // assign the rows to the row variable so that we can return it 
            for (i in rows) {
                row[i] = rows[i];
            }
            
        });

        // close the database to avoid errors
        db.close((err) => {
            if (err) {
                console.error(err.message);
            }
            console.log('Close the database connection.');
        });

        return row;
    },

    longtitude: function () {
        // "lon"= 23.7275390625, "lat"= 37.9838096
        // can be simplified
        // let lon = arguments[0].split(", ")[0].split(":")[1];
        let lon = arguments[0].split(",")[0];

        return lon;
    },

    latitude: function () {
        // let lat = arguments[0].split(",")[1].split(":")[1];
        let lat = arguments[0].split(",")[1];

        return lat;
    },

    workingHours: function () {
        // split arguments[0] by comma and return a list of lists split by space 
        let schedule = {"Monday": "Closed", "Tuesday": "Closed", "Wednesday": "Closed", "Thursday": "Closed", "Friday": "Closed", "Saturday": "Closed", "Sunday": "Closed"}
        let hours = arguments[0].split(",");
        let i=0;
        
        for ( key in schedule) {
            schedule[key] = hours[i]
            i++;
        }
               
        return schedule;
    }


}