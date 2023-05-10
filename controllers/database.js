const sql = require('better-sqlite3')
const betterDb = new sql('model/data.db')

module.exports = {

    connect: (callback) => {
        // connects to the database
        callback(null, true)
    },


    getAllBooks: function (limit, callback) {
        let stmt;
        let books;
        if (limit) {
            stmt = betterDb.prepare('SELECT isbn,title,author,genre,edition,publisher,release,language,cover_image as photo FROM BOOK Limit ?')
            try {
                books = stmt.all(limit)
            }
            catch (err) {
                callback(err, null)
            }
        }
        else {


            stmt = betterDb.prepare('SELECT isbn,title,author,genre,edition,publisher,release,language,cover_image as photo FROM BOOK ')
            try {
                books = stmt.all()
            }
            catch (err) {
                callback(err, null)
            }
        }


        callback(null, books)
    },


    getAllLibraries: function (limit, callback) {
        let stmt;
        let libraries;

        if (limit) {
            stmt = betterDb.prepare('SELECT id,name as title,address,profile_picture as photo FROM LIBRARY Limit ?')
            try {
                libraries = stmt.all(limit)
            }
            catch (err) {
                callback(err, null)
            }
        }
        else {

            stmt = betterDb.prepare('SELECT id,name as title,address,profile_picture as photo FROM LIBRARY ')
            try {
                libraries = stmt.all()
            }
            catch (err) {
                callback(err, null)
            }
        }

        callback(null, libraries)
    },


    getAllAttribute: function (attribute, callback) {
        let stmt;

        switch (attribute) {
            case 'genre':
                stmt = betterDb.prepare('SELECT distinct genre as name FROM BOOK where genre IS not NUll order by name');
                break;
            case 'publisher':
                stmt = betterDb.prepare('SELECT distinct publisher as name FROM BOOK where publisher IS not NUll order by name');
                break;
            case 'author':
                stmt = betterDb.prepare('SELECT distinct author as name FROM BOOK where author IS not NUll order by name');
                break;
            case 'edition':
                stmt = betterDb.prepare('SELECT distinct edition as name FROM BOOK where edition IS not NUll order by name');
                break;
            case 'language':
                stmt = betterDb.prepare('SELECT distinct language as name FROM BOOK where language IS not NUll order by name');
                break;
            case 'library':
                stmt = betterDb.prepare('SELECT distinct name FROM LIBRARY order by name');
                break;
            default:
                callback('Invalid Attribute', null);
                break;
        }

        let attributeList;
        try {
            attributeList = stmt.all()
        }
        catch (err) {
            callback(err, null)
        }
        callback(null, attributeList);
    },

    getBookByIsbnOrTitleLike: function (isbn,title, callback) {
        let stmt ;
        let books;

        if(isbn && title){
            stmt = betterDb.prepare('SELECT isbn,title,author,genre,edition,publisher,release,language,cover_image as photo FROM BOOK where isbn = ? or title like ?')
            try {
                books = stmt.all(isbn,`%${title}%`)
            }
            catch (err) {
                callback(err, null)
            }
        }
        else if(isbn){

        
            stmt = betterDb.prepare('SELECT isbn,title,author,genre,edition,publisher,release,language,cover_image as photo FROM BOOK where isbn = ?')
            try {
                books = stmt.all(isbn)
            }
            catch (err) {
                callback(err, null)
            }
            
        }
        else if(title){
            stmt = betterDb.prepare('SELECT isbn,title,author,genre,edition,publisher,release,language,cover_image as photo FROM BOOK where title like ?')
            try {
                books = stmt.all(`%${title}%`)
            }
            catch (err) {
                callback(err, null)
            }
        }
        callback(null, books)
    },

    getBookByTitleLike: function (title, callback) {
        const stmt = betterDb.prepare('SELECT isbn,title,author,genre,edition,publisher,release,language,cover_image as photo FROM BOOK where title like ? ')
        let books;
        try {
            books = stmt.all(`%${title}%`)
        }
        catch (err) {
            callback(err, null)
        }
        callback(null, books)
    },


    getBookCopies: function (isbn, limit, callback) {
        let stmt;
        let books;

        if (limit & isbn) {

            stmt = betterDb.prepare('Select isbn,title,cover_image as photo,copy_num from BOOK join COPIES on book_isbn=isbn where isbn=? Limit ?')
            try {
                books = stmt.all(isbn, limit)
            }
            catch (err) {
                callback(err, null)
            }
        }
        else if (limit) {
            stmt = betterDb.prepare('Select isbn,title,cover_image as photo,copy_num from BOOK join COPIES on book_isbn=isbn Limit ?')
            try {
                books = stmt.all(limit)
            }
            catch (err) {
                callback(err, null)
            }
        }
        else if (isbn) {
            stmt = betterDb.prepare('Select isbn,title,cover_image as photo,copy_num from BOOK join COPIES on book_isbn=isbn where isbn=? ')
            try {
                books = stmt.all(isbn)
            }
            catch (err) {
                callback(err, null)
            }
        }
        else {
            stmt = betterDb.prepare('Select * from BOOK join COPIES on book_isbn=isbn where isbn=? ')
            try {
                books = stmt.all(isbn)
            }
            catch (err) {
                callback(err, null)
            }
        }

        callback(null, books)
    },


    getLibraryIdOfBookByIsbn: function (isbn, callback) {
        const stmt = betterDb.prepare('Select id,copy_num,name,location,address,phone,email,profile_picture,l.summary,working_hours from BOOK join COPIES on book_isbn=isbn  join LIBRARY as l on library_id=id  where isbn = ?')
        let books;
        try {
            books = stmt.all(isbn)
        }
        catch (err) {
            callback(err, null)
        }
        callback(null, books)
    },


}