#!/bin/python3
import sqlite3 as sq
import sys
import datetime
from codecs import open
import bcrypt
import os
from os import listdir
from os.path import isfile, join
import requests
import random


# https://www.tutorialspoint.com/sqlite/sqlite_python.htm

# database='../dbdesigner/database-data'
# needs to run in the Program Folder

# https://www.googleapis.com/books/v1/volumes?q=title:python

class Creation:
    def __init__(self, database, sqlfile):
        try:
            self.conn = sq.connect(database)
            self.sqlfile = sqlfile
            self.salt = bcrypt.gensalt()
        except Exception as e:
            print(e)
            sys.exit()

    def create_database(self):
        sql = open(self.sqlfile, 'r', encoding='utf-8-sig').read()
        self.conn.executescript(sql)
        self.table_names = [table_name[0] for table_name in self.conn.execute(
            'SELECT name FROM sqlite_master WHERE type="table"').fetchall()]
        # print(self.table_names)
        self.tables = {table_name: [column[1] for column in self.conn.execute(
            f'PRAGMA table_info({table_name})')] for table_name in self.table_names}
        # print([i for i in self.conn.execute("SELECT sql FROM sqlite_master WHERE tbl_name = 'table_name' AND type = 'table'")])
        #  "SELECT sql FROM sqlite_master WHERE tbl_name = 'table_name' AND type = 'table'"
        # print(self.tables)

    def clearing(self, tablename: str):
        '''clears the specific tablename from the values, but does not delete the columns'''
        self.conn.execute(f'DELETE FROM {tablename}')
        self.conn.commit()

    def clear_all(self):
        '''clears all tables'''
        for table in self.table_names:
            self.clearing(table)

    # make it clearer

    def double_quoting(self, string):
        return f"'{str(string)}'"

    def binary_to_string(self, string):
        # return f"'{str(string)[2:-1]}'"
        return f"{str(string)[2:-1]}"

    # string to byte function

    def insert_data(self, table_name, data):
        command = f"""INSERT INTO {table_name}({','.join(self.tables[table_name])}) VALUES ({','.join(list(map(self.double_quoting,data)))})"""
        print(command)
        self.conn.execute(command)
        self.conn.commit()

    def insert_book_data(self, table_name, data):
        command = f"""INSERT INTO {table_name}({','.join(self.tables[table_name])}) VALUES ({','.join(['?' for i in range(len(data))])})"""
        self.conn.execute(command, data)

        self.conn.commit()

    def hashing_password(self, password):
        return self.binary_to_string(bcrypt.hashpw(password.encode('utf-8'), self.salt))

    def main(self):
        self.data = Data()
        self.create_database()
        self.fill_database()
        self.conn.close()

    def fill_database(self):

        self.clear_all()

        libraries = [
            ('0', 'University of Patra', '21.79127500966751,38.29039542648134',
             'Ypatias 4, Panepstimioupoli Patron, 265 04',
             '2610398949', 'bibliothiki@bilbo.gr',
             'img/card_library_1.png', 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vero possimus hic laboriosam perferendis, veritatis corrupti assumenda reprehenderit ducimus dignissimos quia, doloribus unde! Fugit quas minus est ex ratione dolor possimus!Lorem',
             '8:30 AM–7 PM,8:30 AM–7 PM,8:30 AM–7 PM,8:30 AM–7 PM,8:30 AM–7 PM,closed,closed'),
            # ('1', 'Not University of Patra', '21.79127500966751,38.29039542648134',
            #  'Ypatias 4, Panepstimioupoli Patron, 265 04',
            #  '2610398949', 'bibliothiki@bilbo.gr',
            #  'img/card_library_2.png', 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vero possimus hic laboriosam perferendis, veritatis corrupti assumenda reprehenderit ducimus dignissimos quia, doloribus unde! Fugit quas minus est ex ratione dolor possimus!Lorem',
            #  '8:30 AM–7 PM,8:30 AM–7 PM,8:30 AM–7 PM,8:30 AM–7 PM,8:30 AM–7 PM,closed,closed'),

            ('2', 'Poliendro', '21.735480538324822,38.24616051679194',
             ' Kanakari 147, Patra 262 21, 265 04',
             '261 027 7342', 'poliendro@bilbo.gr',
             'img/card_library_2.png', 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vero possimus hic laboriosam perferendis, veritatis corrupti assumenda reprehenderit ducimus dignissimos quia, doloribus unde! Fugit quas minus est ex ratione dolor possimus!Lorem',
             '09:00 AM–09:00 PM,09:00 AM–09:00 PM,09:00 AM–09:00 PM,09:00 AM–09:00 PM,09:00 AM–09:00 PM,closed,closed')


        ]

        for library in libraries:
            self.insert_data('LIBRARY', library)

        def string_to_byte(string):
            return bytes(string, 'utf-8')

        for book in self.data.books:
            titles = ['isbn', 'title', 'authors', 'edition', 'publisher',
                      'release_date', 'genre', 'language', 'summary', 'cover_image']

            self.insert_book_data('BOOK', [book[key] if type(
                book[key]) is not list else ','.join(book[key]) for key in titles])

        # Users

        for book in self.data.books:
            # for i in range(1, 6):
            # isbn , copy_num , library_id
            copy_num = random.randint(1, 5)
            library_id = random.choice(
                list(map(int, [i[0] for i in libraries])))
            self.insert_data('COPIES', (book['isbn'], copy_num, library_id))

        self.insert_data('USER', ('1', 'Nick', 'Fil', '01/01/2001', self.hashing_password(
            'password'), self.binary_to_string(self.salt), 'img/nikolas_profile.png'))

        self.insert_data('USER', ('2', 'Konstantinos', 'Kotorenis', '30/2/1960', self.hashing_password(
            'password'), self.binary_to_string(self.salt), 'img/kotorenis_profile.png'))

        self.insert_data('Borrowing', ('book_isbn', 'copy_num',
                         'library_id', 'user_id', 'date_borrowing', 'date_return'))

        self.insert_data('Return', ('book_isbn', 'copy_num', 'library_id',
                         'user_id', 'date_of_borrowing', 'date_of_return'))


class Data:
    def __init__(self):
        self.path = 'bookdata'
        if not os.path.exists(self.path):
            os.mkdir(self.path)
        #  if path is empty
        if not listdir(self.path):
            self.download_book_json()

        self.main()

    def get_titles(self):

        files = [f for f in listdir(self.path) if isfile(join(self.path, f))]
        return files

    def load_bookdata(self, title, num=1):

        with open(f'{self.path}/{title}', 'r') as f:
            file = eval(f.read())

        def books(num): return [self.bookformat(
            file['items'][i]) for i in range(num)]

        return books(num)

    def bookformat(self, file):

        book = {i: None for i in ['title', 'publisher', 'authors', 'isbn',
                                  'summary', 'cover_image', 'release_date', 'genre', 'language', 'edition']}

        if 'title' in file['volumeInfo']:
            book['title'] = file['volumeInfo']['title']

        if 'publisher' in file['volumeInfo']:
            book['publisher'] = file['volumeInfo']['publisher']

        if 'authors' in file['volumeInfo']:
            book['authors'] = file['volumeInfo']['authors']

        if 'industryIdentifiers' in file['volumeInfo']:
            book['isbn'] = file['volumeInfo']['industryIdentifiers'][0]['identifier']

        if 'description' in file['volumeInfo']:
            book['summary'] = file['volumeInfo']['description']

        if 'imageLinks' in file['volumeInfo']:
            book['cover_image'] = file['volumeInfo']['imageLinks']['thumbnail']

        if 'publishedDate' in file['volumeInfo']:
            book['release_date'] = file['volumeInfo']['publishedDate']

        if 'categories' in file['volumeInfo']:
            book['genre'] = file['volumeInfo']['categories']

        if 'language' in file['volumeInfo']:
            book['language'] = file['volumeInfo']['language']

        if 'contentVersion' in file['volumeInfo']:
            book['edition'] = file['volumeInfo']['contentVersion']
        return book

    def load_books(self):
        self.books = []
        for title in self.get_titles():
            self.books += self.load_bookdata(title)

    def save_bookdata(self, title):
        def api_title(
            x): return f'https://www.googleapis.com/books/v1/volumes?q=title:{x}'
        def api_isbn(
            x): return f'https://www.googleapis.com/books/v1/volumes?q=isbn:{x}'

        def get_data(url): return requests.get(url).json()

        with open(f'{self.path}/{title}.json', 'w') as f:
            f.write(str(get_data(api_title(title))))

    def download_book_json(self, titles=None):
        if titles is None:
            self.titles = ['python', 'java', 'javascript', 'html', 'css', 'php', 'sql', 'ruby', 'perl', 'r', 'go', 'swift', 'kotlin', 'rust', 'typescript', 'bash', 'powershell', 'matlab', 'assembly', 'vba', 'visual basic', 'dart', 'groovy', 'scala',
                           'history', 'calculus',
                           'the lord of the rings', 'the hobbit', 'the silmarillion', 'the children of hurin', 'the fall of gondolin', 'the book of lost tales', 'the book of lost tales part 2', 'the lay of aotrou and itroun', 'the lay of leithian', 'the shaping of middle-earth', 'the lost road and other writings', 'the return of the shadow', 'the treason of isengard', 'the war of the ring', 'sauron defeated', 'morgoths ring', 'the war of the jewels', 'the peoples of middle-earth',
                           ]

        for title in self.titles:
            # print(title)
            self.save_bookdata(title)

    def main(self):
        self.load_books()


if __name__ == '__main__':

    database = 'data.db'
    sqlfile = 'dbdesigner.sql'
    app = Creation(database, sqlfile)
    app.main()
