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

    equals: function (arg1, arg2) {
        return arg1 == arg2;
    },

    databaseCommand: function () {
        // connects to the database, executed the given command (arguments[0]) and returns the row that holds the result
        let command = arguments[0];
        let rowDict = {};

        // model is a public folder for node 

        let db = new sqlite3.Database('model/data.db', (err) => {
            if (err) {
                console.error(err.message);
            }
            // this is for debugging reasons, can be removed
            // see if we can change it with status
            // console.log(`Connected to the database. ${command}`);
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
                rowDict[i] = rows[i];
            }

        });

        // close the database to avoid errors
        db.close((err) => {
            if (err) {
                console.error(err.message);
            }
            // console.log('Close the database connection.');
        });
        // console.log(rowDict);
        return rowDict;
    },


    databaseAllCommand: function () {

        // connects to the database, executed the given command (arguments[0]) and returns the row that holds the result
        let command = arguments[0];
        // console.log(command);
        let rowList = [];

        // model is a public folder for node 

        let db = new sqlite3.Database('model/data.db', (err) => {
            if (err) {
                console.error(err.message);
            }

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

            rows.forEach((row) => {
                // console.log(row);
                rowList.push(row);
                // console.log(rowList);   
            });

        });

        // close the database to avoid errors
        db.close((err) => {
            if (err) {
                console.error(err.message);
            }
        });

        // console.log(rowList);
        return rowList;
    },


    // get the book info from the database

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
        let schedule = { "Monday": "Closed", "Tuesday": "Closed", "Wednesday": "Closed", "Thursday": "Closed", "Friday": "Closed", "Saturday": "Closed", "Sunday": "Closed" }
        let hours = arguments[0].split(",");
        let i = 0;

        for (key in schedule) {
            schedule[key] = hours[i]
            i++;
        }

        return schedule;
    }


}