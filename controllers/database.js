const sql = require('better-sqlite3')
const betterDb = new sql('model/bilboData.sqlite')

const bcrypt = require('bcrypt');

module.exports = {

    connect: (callback) => {
        // connects to the database
        callback(null, true)
    },


    getLibraryInfo: function (id, limit, callback) {
        let stmt;
        let libraries;

        try {
            if (id && limit) {
                stmt = betterDb.prepare('Select * FROM LIBRARY where id = ?');
                libraries = stmt.get(id);
            }
            else if (id) {
                stmt = betterDb.prepare('Select * FROM LIBRARY where id = ?');
                libraries = stmt.get(id);
            }
            else if (limit) {
                stmt = betterDb.prepare('Select * FROM LIBRARY LIMIT ?');
                libraries = stmt.all(limit);
            }
            else {
                stmt = betterDb.prepare('Select * FROM LIBRARY ');
                libraries = stmt.all();
            }

        } catch (err) {
            callback(err, null)
        }

        callback(null, libraries);

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

    getBookInfo: function (isbn, title, copies, limit, callback) {
        let stmt, books;

        try {

            if (isbn && title && copies && limit) {
                stmt = betterDb.prepare('SELECT * FROM BOOK join COPIES on isbn=book_isbn WHERE isbn=? or title like ? LIMIT ?');
                books = stmt.all(isbn, `%${title}%`, limit);
            } else if (isbn && title) {

            } else if (isbn && title && copies) {
                stmt = betterDb.prepare('SELECT * FROM BOOK join COPIES on isbn=book_isbn WHERE isbn=? or title like ?');
                books = stmt.all(isbn, `%${title}%`);

            } else if (isbn && title && limit) {
                stmt = betterDb.prepare('SELECT * FROM BOOK WHERE isbn=? or title like ? LIMIT ?');
                books = stmt.all(isbn, `%${title}%`, limit);

            } else if (isbn && copies && limit) {
                stmt = betterDb.prepare('SELECT * FROM BOOK join COPIES on isbn=book_isbn WHERE isbn=? LIMIT ?');
                books = stmt.all(isbn, limit);

            } else if (title && copies && limit) {
                stmt = betterDb.prepare('SELECT * FROM BOOK join COPIES on isbn=book_isbn WHERE title like ? LIMIT ?');
                books = stmt.all(`%${title}%`, limit);

            } else if (isbn && title) {
                stmt = betterDb.prepare('SELECT * FROM BOOK WHERE isbn=? or title like ? ');
                books = stmt.all(isbn, `%${title}%`);

            } else if (isbn && copies) {
                stmt = betterDb.prepare('SELECT * FROM BOOK join COPIES on isbn=book_isbn WHERE isbn=? ');
                books = stmt.all(isbn);

            } else if (isbn && limit) {
                stmt = betterDb.prepare('SELECT * FROM BOOK WHERE isbn=? LIMIT ?');
                books = stmt.all(isbn, limit);

            } else if (title && copies) {
                stmt = betterDb.prepare('SELECT * FROM BOOK join COPIES on isbn=book_isbn WHERE title like ? ');
                books = stmt.all(`%${title}%`);

            } else if (title && limit) {
                stmt = betterDb.prepare('SELECT * FROM BOOK WHERE title like ? LIMIT ?');
                books = stmt.all(`%${title}%`, limit);

            } else if (copies && limit) {
                stmt = betterDb.prepare('SELECT * FROM BOOK join COPIES on isbn=book_isbn LIMIT ?');
                books = stmt.all(limit);

            } else if (isbn) {
                stmt = betterDb.prepare('SELECT * FROM BOOK WHERE isbn=?');
                books = stmt.get(isbn);

            } else if (title) {
                stmt = betterDb.prepare('SELECT * FROM BOOK WHERE title like ?');
                books = stmt.all(`%${title}%`);

            } else if (copies) {
                stmt = betterDb.prepare('SELECT * FROM BOOK join COPIES on isbn=book_isbn');
                books = stmt.all();

            } else if (limit) {
                stmt = betterDb.prepare('SELECT * FROM BOOK  LIMIT ?');
                books = stmt.all(limit);
            } else {
                stmt = betterDb.prepare('SELECT * FROM BOOK join COPIES on isbn=book_isbn');
                books = stmt.all();

            }

        } catch (err) {
            callback(err, null);
        }

        callback(null, books);

        // import itertools
        // >>> lst = ['isbn','title','copies','limit']
        // >>> for i in range(1,len(lst)+1):
        // ...     
        // KeyboardInterrupt
        // >>> for i in range(1,len(lst)+1):
        // ...     for j in itertools.combinations(lst,i):
        // ...             print(' && '.join(list(j))

    },

    getLibraryIdOfBookByIsbn: function (isbn, callback) {
        const stmt = betterDb.prepare('Select id,copy_num,name,location,address,phone,email,l.photo as photo,l.summary,working_hours from BOOK join COPIES on book_isbn=isbn  join LIBRARY as l on library_id=id  where isbn = ?')
        let books;
        try {
            books = stmt.all(isbn)
        }
        catch (err) {
            callback(err, null)
        }
        callback(null, books)
    },

    getBooksFromLibrary: function (libraryId, limit, callback) {
        let stmt;
        let books;

        if (limit) {
            stmt = betterDb.prepare('Select isbn,title,photo,copy_num from BOOK join COPIES on book_isbn=isbn where library_id=? Limit ?')
            try {
                books = stmt.all(libraryId, limit)
            }
            catch (err) {
                callback(err, null)
            }
            // console.log(books)
        }
        else {
            stmt = betterDb.prepare('Select isbn,title,photo,copy_num from BOOK join COPIES on book_isbn=isbn where library_id=? ')
            try {
                books = stmt.all(libraryId)
            }
            catch (err) {
                callback(err, null)
            }
        }

        callback(null, books)
    },

    getUserById: function (id, callback) {
        const stmt = betterDb.prepare('Select * from USER where id=?')
        let user;
        try {
            user = stmt.get(id)
        }
        catch (err) {
            callback(err, null)
        }
        callback(null, user)
    },

    checkIfUserExists: function (email, callback) {
        const stmt = betterDb.prepare('Select * from USER where email = ? ')
        let user;
        try {
            user = stmt.get(email)
        }
        catch (err) {
            callback(err, null)
        }
        callback(null, user)
    },

    checkUser: function (email, password, callback) {
        const stmt = betterDb.prepare('Select * from USER where email = ?')

        let user;

        try {

            user = stmt.get(email)
            if (user) {
                const match = bcrypt.compareSync(password, user.password);
                if (match) {

                    // console.log(bcrypt.compare(user.password,password))
                    callback(null, user)
                }
                else {
                    callback('Wrong Password', null)
                }
            }
        }
        catch (err) {
            callback(err, null)
        }


    },

    addUser: function (user, callback) {
        // .email, req.body.fname,req.body.lname,req.body.birthdate ,req.body.psw
        const stmt = betterDb.prepare('Insert into USER (fname,lname,email,birthdate,password) values (?,?,?,?,?)')
        // const stmt = betterDb.prepare('Insert into USER (fname,lname,email,birthdate,salt,password) values (?,?,?,?,?,?)')

        try {
            stmt.run(user.fname, user.lname, user.email, user.birthdate, user.psw)

            // stmt.run(user.fname,user.lname,user.email,user.birthdate ,user.salt,user.psw)
        }
        catch (err) {
            callback(err, null)
        }
        callback(null, 'User Added')
    },




}