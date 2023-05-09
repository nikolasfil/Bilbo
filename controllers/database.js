const sqlite3 = require('sqlite3').verbose();
const sql = require('better-sqlite3')
const betterDb = new sql('model/data.db')

module.exports = {

    connect: (callback) => {
        // connects to the database
        callback(null,true)
    },

    betterDatabase: function (callback) {
        // WHERE isbn = ?
        const stmt = betterDb.prepare('SELECT * FROM BOOK ')
        let books;
        try { 
            books = stmt.all()
        }
        catch (err) {
            callback(err,null)
        }
        callback(null,books)

    },

    getAllBooks: function (callback) {
        const stmt = betterDb.prepare('SELECT isbn,title,author,edition,publisher,release,language,cover_image as photo FROM BOOK ')
        let books;
        try { 
            books = stmt.all()
        }
        catch (err) {
            callback(err,null)
        }
        callback(null,books)
    },

    getAllGenre: function (callback) {
        const stmt = betterDb.prepare('SELECT distinct genre as name FROM BOOK where genre IS not NUll order by name')
        let genreList;
        try { 
            genreList = stmt.all()
        }
        catch (err) {
            callback(err,null)
        }
        callback(null,genreList)
    },

    getAllPublisher: function (callback) {
        const stmt = betterDb.prepare('SELECT distinct publisher as name FROM BOOK where publisher IS not NUll order by name')
        let publisherList;
        try { 
            publisherList = stmt.all()
        }
        catch (err) {
            callback(err,null)
        }
        callback(null,publisherList)
    },

    getAllAuthor: function (callback) {
        const stmt = betterDb.prepare('SELECT distinct author as name FROM BOOK where author IS not NUll order by name')
        let authorList;
        try { 
            authorList = stmt.all()
        }
        catch (err) {
            callback(err,null)
        }
        callback(null,authorList)
    },

    getAllEdition: function (callback) {
        const stmt = betterDb.prepare('SELECT distinct edition as name FROM BOOK where edition IS not NUll order by name')
        let editionList;
        try { 
            editionList = stmt.all()
        }
        catch (err) {
            callback(err,null)
        }
        callback(null,editionList)
    },

    getAllLanguage: function (callback) {
        const stmt = betterDb.prepare('SELECT distinct language as name FROM BOOK where language IS not NUll order by name')
        let languageList;
        try { 
            languageList = stmt.all()
        }
        catch (err) {
            callback(err,null)
        }
        callback(null,languageList)
    },

    getAllLibrary: function (callback) {
        const stmt = betterDb.prepare('SELECT distinct id,name FROM LIBRARY')
        let libraryList;
        try { 
            libraryList = stmt.all()
        }
        catch (err) {
            callback(err,null)
        }
        callback(null,libraryList)
    },



    getBookByIsbn: function (isbn,callback) {
        const stmt = betterDb.prepare('SELECT * FROM BOOK where isbn = ?')
        let books;
        try { 
            books = stmt.all()
        }
        catch (err) {
            callback(err,null)
        }
        callback(null,books)
    },

    getBookByTitleLike: function (title,callback) {
        const stmt = betterDb.prepare('SELECT isbn,title,author,edition,publisher,release,language,cover_image as photo FROM BOOK where title like ?')
        let books;
        try { 
            books = stmt.all()
        }
        catch (err) {
            callback(err,null)
        }
        callback(null,books)
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

    databasePrepare: function () {

        // connects to the database, executed the given command (arguments[0]) and returns the row that holds the result
        let command = arguments[0];
        if (arguments.length > 1) {
            // args is the rest of arguments from 1 to the end
            let args = arguments[1];
        }
        // console.log(command);
        let rowList = [];

        // model is a public folder for node 

        let db = new sqlite3.Database('model/data.db', (err) => {
            if (err) {
                console.error(err.message);
            }

        });


        let smtp = db.prepare(command);

        let data = smtp.all()

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

    databaseGetBooks: function (callback) {
        // connects to the database, executed the given command (arguments[0]) and returns the row that holds the result

        let db = new sqlite3.Database('model/data.db', (err) => {
            if (err) {
                console.error(err.message);
            }

        });


        let dbBooks = db.prepare("SELECT * FROM BOOK")
        try {
            let data = dbBooks.all()
            callback(data);
        }
        catch (err) {
            console.log(err);
        }
        // close the database to avoid errors
        // db.close((err) => {
        //     if (err) {
        //         console.error(err.message);
        //     }
        // });

        // console.log(rowList);
    },

    // databaseBetterSql: 

}