const sql = require('better-sqlite3')
const betterDb = new sql('model/bilboData.sqlite')

const bcrypt = require('bcrypt');
const { query } = require('express');

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

    /**
     * Returns Information about the library . without id or limit it returns info for every library 
     * @param {*} id For a specific library (optional)
     * @param {*} limit Limiting the number of results (optional)
     * @param {*} callback function that handles the results
     */
    getLibraryInfo: function (id, limit, callback) {
        let stmt, libraries;

        let query = `Select * FROM LIBRARY`

        if (id) {
            query += ' where id = ?'
        }

        if (limit) {
            query += ' LIMIT ?'
        }

        try {
            stmt = betterDb.prepare(query)
            if (id && limit) {
                libraries = stmt.get(id, limit);
            }
            else if (id) {
                libraries = stmt.get(id);
            }
            else if (limit) {
                libraries = stmt.all(limit);
            }
            else {
                libraries = stmt.all();
            }

        } catch (err) {
            callback(err, null)
        }

        callback(null, libraries);

    },

    /**
     * Returns information for a specific category , used in filters
     * @param {*} attribute [library,language , genre, edition, release date etc] 
     * @param {*} limit (optional)
     * @param {*} offset (optional)
     * @param {*} callback 
     */
    getAllAttribute: function (attribute, limit, offset, callback) {
        let stmt, query, attributeList;

        if (attribute == 'library') {

            query = 'SELECT distinct name FROM LIBRARY order by name'
        }
        else if (attribute == 'language') {
            query = 'SELECT distinct language as name FROM BOOK where language IS not NUll order by name'

        }
        else {
            query = `SELECT distinct ${attribute} as name,COUNT(*) as count FROM BOOK where name IS not NUll GROUP BY genre ORDER BY count DESC, name ASC`
        }

        if (limit) {
            query += ` LIMIT ?`
        }
        if (offset) {
            query += ` OFFSET ?`
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

    /**
     * Returns information about books . Every option other than callback is optional , if no option is given it will return all the books without copies 
     * @param {*} isbn  specify the isbn (optional)
     * @param {*} title specify the title (optional) 
     * @param {*} numOf true or null, if we want to focus more on the number of results back 
     * @param {*} copies true or null , if we want to also get the number of copies that exist 
     * @param {*} filters searches with filters 
     * @param {*} limit limits the results 
     * @param {*} offset starts returning from a specific result 
     * @param {*} callback 
     */
    getBookInfo: function (isbn, title, numOf, copies, filters, limit, offset, callback) {
        let stmt, books, query;

        query = `SELECT * FROM BOOK`

        if (numOf) {
            // query = 'SELECT COUNT(isbn) as count_result from BOOK'

            // query = 'SELECT COUNT(isbn) as count_result from BOOK join COPIES on isbn=book_isbn'

            query = 'SELECT COUNT(distinct isbn) as count_result,title,library.name as library,genre , language,book.summary as summary,publisher, edition, author  from BOOK join COPIES on isbn=book_isbn join LIBRARY on library_id=LIBRARY.id'

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
                    if (!title && !isbn && key !== Object.keys(filters)[0]) {
                        query += ` and`
                    } else if (!title && !isbn && key === Object.keys(filters)[0]) {
                        query += ` WHERE`
                    }
                    else if (title || isbn) {
                        query += ` and`
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

        console.log(`query: ${query}`)
        stmt = betterDb.prepare(query);


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

    /**
     * Loads the library info where a book copy exists 
     * 
     * @param {*} isbn 
     * @param {*} callback 
     */
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
        let stmt, books, query;

        query = 'SELECT isbn,title,photo,copy_num FROM BOOK join COPIES on book_isbn=isbn where library_id=?'

        if (limit) {
            query += ' LIMIT ?'
        }

        try {
            stmt = betterDb.prepare(query);
            if (limit) {
                books = stmt.all(libraryId, limit)
            } else {
                books = stmt.all(libraryId)
            }
        } catch (err) {
            callback(err, null);
        }

        callback(null, books)
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

    userDetails: function (email, callback) {
        const stmt = betterDb.prepare('Select id, fname, lname, email, birthdate from USER where email = ? ')
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

        let user;

        try {
            const stmt = betterDb.prepare('Select * from USER where email = ?')
            user = stmt.get(email)
            if (user) {
                const match = bcrypt.compareSync(password, user.password);
                if (match) {
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
        const stmt = betterDb.prepare('Insert into USER (fname,lname,email,birthdate,password) values (?,?,?,?,?)')

        try {
            stmt.run(user.fname, user.lname, user.email, user.birthdate, bcrypt.hashSync(user.psw, 10))
        }
        catch (err) {
            callback(err, null)
        }
        callback(null, true)
    },

}