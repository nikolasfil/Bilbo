const sql = require('better-sqlite3')
const betterDb = new sql('model/data.db')

module.exports = {

    connect: (callback) => {
        // connects to the database
        callback(null, true)
    },

    
    getAllBooksLimit: function (limit, callback) {

        const stmt = betterDb.prepare('SELECT isbn,title,author,edition,publisher,release,language,cover_image as photo FROM BOOK Limit ' + limit)
        let books;
        try {
            books = stmt.all()
        }
        catch (err) {
            callback(err, null)
        }
        callback(null, books)
    },

    getAllLibraries: function (callback) {

        const stmt = betterDb.prepare('SELECT id,name as title,address,profile_picture as photo FROM LIBRARY ')
        let libraries;
        try {
            libraries = stmt.all()
        }
        catch (err) {
            callback(err, null)
        }
        callback(null, libraries)
    },

    getAllLibrariesLimit: function (limit, callback) {

        const stmt = betterDb.prepare('SELECT id,name as title,address,profile_picture as photo FROM LIBRARY Limit ?')
        let libraries;
        try {
            libraries = stmt.all(limit)
        }
        catch (err) {
            callback(err, null)
        }
        callback(null, libraries)
    },

    getAllBooks: function (callback) {

        const stmt = betterDb.prepare('SELECT isbn,title,author,edition,publisher,release,language,cover_image as photo FROM BOOK ')
        let books;
        try {
            books = stmt.all()
        }
        catch (err) {
            callback(err, null)
        }
        callback(null, books)
    },

    getAllGenre: function (callback) {
        const stmt = betterDb.prepare('SELECT distinct genre as name FROM BOOK where genre IS not NUll order by name')
        let genreList;
        try {
            genreList = stmt.all()
        }
        catch (err) {
            callback(err, null)
        }
        callback(null, genreList)
    },

    getAllPublisher: function (callback) {
        const stmt = betterDb.prepare('SELECT distinct publisher as name FROM BOOK where publisher IS not NUll order by name')
        let publisherList;
        try {
            publisherList = stmt.all()
        }
        catch (err) {
            callback(err, null)
        }
        callback(null, publisherList)
    },

    getAllAuthor: function (callback) {
        const stmt = betterDb.prepare('SELECT distinct author as name FROM BOOK where author IS not NUll order by name')
        let authorList;
        try {
            authorList = stmt.all()
        }
        catch (err) {
            callback(err, null)
        }
        callback(null, authorList)
    },

    getAllEdition: function (callback) {
        const stmt = betterDb.prepare('SELECT distinct edition as name FROM BOOK where edition IS not NUll order by name')
        let editionList;
        try {
            editionList = stmt.all()
        }
        catch (err) {
            callback(err, null)
        }
        callback(null, editionList)
    },

    getAllLanguage: function (callback) {
        const stmt = betterDb.prepare('SELECT distinct language as name FROM BOOK where language IS not NUll order by name')
        let languageList;
        try {
            languageList = stmt.all()
        }
        catch (err) {
            callback(err, null)
        }
        callback(null, languageList)
    },

    getAllLibrary: function (callback) {
        const stmt = betterDb.prepare('SELECT distinct id,name FROM LIBRARY')
        let libraryList;
        try {
            libraryList = stmt.all()
        }
        catch (err) {
            callback(err, null)
        }
        callback(null, libraryList)
    },

    getBookByIsbn: function (isbn, callback) {
        const stmt = betterDb.prepare('SELECT isbn,title,author,edition,publisher,release,language,cover_image as photo FROM BOOK where isbn = ?')
        let books;
        try {
            books = stmt.all(isbn)
        }
        catch (err) {
            callback(err, null)
        }
        callback(null, books)
    },

    getBookByTitleLike: function (title, callback) {
        const stmt = betterDb.prepare('SELECT isbn,title,author,edition,publisher,release,language,cover_image as photo FROM BOOK where title like ? ')
        let books;
        try {
            books = stmt.all(`%${title}%`)
        }
        catch (err) {
            callback(err, null)
        }
        callback(null, books)
    },

    getBookCopiesByIsbn: function (isbn, callback) {
        const stmt = betterDb.prepare('Select * from BOOK join COPIES on book_isbn=isbn where isbn=?')
        let books;
        try {
            books = stmt.all(isbn)
        }
        catch (err) {
            callback(err, null)
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

    // databaseBetterSql: 

}