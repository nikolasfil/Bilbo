CREATE TABLE library (
    id binary PRIMARY KEY AUTOINCREMENT,
    location binary PRIMARY KEY AUTOINCREMENT
);

CREATE TABLE book (
    id binary PRIMARY KEY AUTOINCREMENT,
    title varchar PRIMARY KEY AUTOINCREMENT,
    publisher varchar PRIMARY KEY AUTOINCREMENT,
    author varchar PRIMARY KEY AUTOINCREMENT,
    edition varchar PRIMARY KEY AUTOINCREMENT,
    release date datetime PRIMARY KEY AUTOINCREMENT,
    genre varchar PRIMARY KEY AUTOINCREMENT,
    summary varchar
);

CREATE TABLE copy (
    book_id binary,
    copy integer PRIMARY KEY AUTOINCREMENT,
    libary_id binary
);

CREATE TABLE user (
    id binary PRIMARY KEY AUTOINCREMENT,
    fname varchar PRIMARY KEY AUTOINCREMENT,
    lname varchar PRIMARY KEY AUTOINCREMENT,
    birthdate datetime PRIMARY KEY AUTOINCREMENT,
    password varchar PRIMARY KEY AUTOINCREMENT,
    salt varchar PRIMARY KEY AUTOINCREMENT
);

CREATE TABLE borrowing (
    book_id binary,
    copy binary,
    library_id binary,
    user_id binary,
    date_borrowing datetime,
    date_return datetime
);

CREATE TABLE return (
    book_id binary,
    copy binary,
    library_id binary,
    user_id binary,
    date_of_borrowing datetime,
    date_of_return datetime PRIMARY KEY AUTOINCREMENT
);






