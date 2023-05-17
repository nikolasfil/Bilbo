CREATE TABLE IF NOT EXISTS LIBRARY (
	id			INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL , 
	name 		varchar(100) 		NOT NULL,
	location	varchar(100) 		NOT NULL ,
	address 	varchar(100) 		NOT NULL,
	phone 		varchar(100) 		NOT NULL,
	email 		varchar(100) 		NOT NULL,
	photo		varchar(100) 		NOT NULL,
	summary	varchar(1000) 	NOT NULL,
	working_hours 	varchar(1000) 	NOT NULL

);

CREATE TABLE IF NOT EXISTS BOOK (
	isbn varchar(100)  ,
	title varchar(100) ,
	author varchar(100) ,
	edition varchar(100) ,
	publisher varchar(100) ,
	release varchar(100)  ,
	genre varchar(100) ,
	language varchar(100) ,
	summary varchar(1000) ,
	photo binary ,
	PRIMARY KEY (isbn)
);

-- CREATE TABLE IF NOT EXISTS BOOK (
-- 	isbn binary NOT NULL ,
-- 	title varchar(1000) NOT NULL,
-- 	author varchar(100) ,
-- 	edition varchar(100) ,
-- 	publisher varchar(100) ,
-- 	release date datetime ,
-- 	genre varchar(100) ,
-- 	language varchar(100) NOT NULL,
-- 	summary varchar(1000) NOT NULL,
-- 	cover_image binary NOT NULL,
-- 	PRIMARY KEY (isbn)
-- );



CREATE TABLE IF NOT EXISTS COPIES (
	book_isbn binary NOT NULL,
	copy_num INTEGER NOT NULL,
	library_id INTEGER NOT NULL,
	PRIMARY KEY (book_isbn, copy_num, library_id),
	FOREIGN KEY (book_isbn) REFERENCES BOOK(isbn) ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY (library_id) REFERENCES LIBRARY(id) ON DELETE CASCADE ON UPDATE CASCADE

);

CREATE TABLE IF NOT EXISTS USER (
	id INTEGER PRIMARY KEY AUTOINCREMENT ,
	fname varchar(255) NOT NULL,
	lname varchar(255) NOT NULL,
	email varchar(255) NOT NULL UNIQUE,
	birthdate datetime NOT NULL,
	password varchar(255) NOT NULL,
	salt varchar(255) 
);

CREATE TABLE IF NOT EXISTS Borrowing (
	book_isbn binary NOT NULL,
	copy_num binary NOT NULL,
	library_id INTEGER NOT NULL,
	user_id INTEGER NOT NULL,
	date_borrowing datetime NOT NULL,
	date_return datetime,
	PRIMARY KEY (book_isbn, copy_num, library_id, user_id, date_borrowing),
	FOREIGN KEY (book_isbn, copy_num, library_id) REFERENCES COPIES(book_isbn, copy_num, library_id) ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY (user_id) REFERENCES USER(id) ON DELETE CASCADE ON UPDATE CASCADE

);

CREATE TABLE IF NOT EXISTS Return (
	book_isbn binary NOT NULL,
	copy_num binary NOT NULL,
	library_id INTEGER	NOT NULL,
	user_id INTEGER 		NOT NULL,
	date_of_borrowing datetime 		NOT NULL,
	date_of_return datetime NOT NULL,
	PRIMARY KEY (book_isbn, copy_num, library_id, user_id, date_of_borrowing, date_of_return),
	FOREIGN KEY (book_isbn, copy_num, library_id) REFERENCES COPIES(book_isbn, copy_num, library_id) ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY (user_id) REFERENCES USER(id) ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY (date_of_borrowing) REFERENCES Borrowing(date_borrowing) ON DELETE CASCADE ON UPDATE CASCADE
);







