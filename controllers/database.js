const sql = require('better-sqlite3')
const betterDb = new sql('model/bilboData.sqlite')

const bcrypt = require('bcrypt');

function escapeRegExp(string) {
    return string.replace(/[.*+\-?^${}()|[\]\\]/g, "\\$&");
}


function getRegex(title) {

    let rows;
    try {
        rows = betterDb.prepare('Select title from BOOK').all()

    } catch (err) {
        throw err;
    }

    const commonWords = [
        'the', 'of', 'and', 'a', 'to', 'in', 'is', 'you', 'that', 'it', 'he', 'was', 'for', 'on', 'are', 'as', 'with', 'his', 'they', 'I']

    title = title.trim();
    const words = title.split(" ");

    // const escapedWords = words.map((word) => escapeRegExp(word));

    const partialWords = words.filter(word => !commonWords.includes(word));

    const partialPattern = partialWords.map(word => `(?:\\b|\\B)${escapeRegExp(word)}\\w*(?:\\b|\\B)`).join('|');

    const exactPattern = `\\b${escapeRegExp(title)}\\b`;

    const pattern = `(?:${partialPattern}|${exactPattern})`;

    const matchingPhrases = rows.filter(row => new RegExp(pattern, 'i').test(row.title)).map(row => row.title);



    // const pattern = escapedWords.map(word => `(?:\\b|\\B)${word.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')}\\w*(?:\\b|\\B)`).join('|');

    // const matchingPhrases = rows.filter(row => new RegExp(pattern, 'i').test(row.title)).map(row => row.title);


    return matchingPhrases;



}


module.exports = {

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


    getAllAttribute: function (attribute,limit,offset, callback) {
        let stmt, query,attributeList;

        if (attribute=='library'){

            query='SELECT distinct name FROM LIBRARY order by name'
        }
        else if (attribute=='language'){
            query = 'SELECT distinct language as name FROM BOOK where language IS not NUll order by name'

        }
        else {
            query = `SELECT distinct ${attribute} as name,COUNT(*) as count FROM BOOK where name IS not NUll GROUP BY genre ORDER BY count DESC, name ASC`
        }

        if (limit && offset) {
            query += ` LIMIT ? OFFSET ?`
        } else if (limit) {
            query += ` LIMIT ?`
        }

        
        stmt = betterDb.prepare(query);
        
        try {
            if (limit && offset) {
                attributeList = stmt.all(limit, offset)
            }
            else if (limit) {
                attributeList = stmt.all(limit)
            }
            else {
                attributeList = stmt.all()
            }
        }
        catch (err) {
            callback(err, null)
        }
        callback(null, attributeList);
    },



    getBookInfo: function (isbn, title, numOf,copies, filters, limit, offset, callback) {
        let stmt, books, query;

        query = `SELECT * FROM BOOK`
        // select count(isbn), sum(copy_num) as copy_num  from BOOK join COPIES on isbn=book_isbn where title LIKE '%python%' GROUP BY isbn 

        if (numOf){
            query = 'SELECT COUNT(isbn) as count_result from BOOK'
        }

        if (copies && !numOf) {

            query = `SELECT isbn,title,author,edition,publisher,release, genre , language, book.summary as summary, BOOK.photo as photo,SUM(copy_num) as copy_num, library.name as library FROM BOOK join COPIES on isbn=book_isbn join LIBRARY on library_id=LIBRARY.id`
        }
        if (isbn || title) {
            query += ` WHERE`
        }

        if (isbn) {
            query += ` isbn=?`
        }

        if (isbn && title) {
            query += ` or`

        }
        if (title) {
            // query += ` title like ?`
            // title = `%${title}%`
            let matchingPhrases;
            try {

                matchingPhrases = getRegex(title);
            } catch (err) {
                callback(err, null);
            }

            query += ` title in (${matchingPhrases.map(() => '?').join(', ')})`
            title = matchingPhrases;

        }

        
        if (filters && Object.keys(filters) !== 0) {
            filters = JSON.parse(filters);

            for (let key in filters) {
                if (filters[key].length) {
                    if (title || isbn) {
                        query += ` and`
                    }
                    else {
                        query+= ` WHERE `
                    }
                    let list = filters[key].map(word => `'${word}'`).join(',')
                    query += ` ${key} in (${list})`
                }
            }
        }

        if (copies) {
            query += ` GROUP BY isbn`
        }

        query += ` ORDER BY title ASC`

        if (limit) {
            query += ` LIMIT ?`
        }

        if (offset) {
            query += ` OFFSET ?`
        }

        stmt = betterDb.prepare(query);


        console.log(query)



        try {

            if (isbn && title && limit && offset) {
                books = stmt.all(isbn, title, limit, offset)

            } else if (isbn && title && limit) {
                books = stmt.all(isbn, title, limit)

            } else if (isbn && limit && offset) {
                books = stmt.all(isbn, limit, offset)


            } else if (title && limit && offset) {
                books = stmt.all(title, limit, offset)


            } else if (isbn && title) {
                books = stmt.all(isbn, title)

            } else if (isbn && limit) {
                books = stmt.all(isbn, limit)

            } else if (title && limit) {
                books = stmt.all(title, limit)

            } else if (limit && offset) {
                books = stmt.all(limit, offset)


            } else if (title) {
                books = stmt.all(title)

            } else if (limit) {
                books = stmt.all(limit)

            } else if (isbn) {
                books = stmt.all(isbn)
            } else {
                books = stmt.all();
            }
        } catch (err) {
            callback(err, null);
        }

        callback(null, books);

    },
    
    getLibraryIdOfBookByIsbn: function (isbn, callback) {
        // const stmt = betterDb.prepare('Select id,copy_num,name,location,address,phone,email,l.photo as photo,l.summary,working_hours from BOOK join COPIES on book_isbn=isbn  join LIBRARY as l on library_id=id  where isbn = ?')
        
        // this needs to be separate. Book info per library and a different one for location

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

    getLibraryLocations: function (isbn,callback){

        const stmt = betterDb.prepare('select name,location from BOOK join COPIES on isbn=book_isbn join LIBRARY on id=library_id where isbn = ?')

        let books;

        try{
            books = stmt.all(isbn);
        }catch (err) {
            callback(err, null);
        }
        callback(null,books);
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
            // stmt.run(user.fname, user.lname, user.email, user.birthdate, user.psw)
            stmt.run(user.fname, user.lname, user.email, user.birthdate, bcrypt.hashSync(user.psw, 10))

            // stmt.run(user.fname,user.lname,user.email,user.birthdate ,user.salt,user.psw)
        }
        catch (err) {
            callback(err, null)
        }
        callback(null, true)
    },




}