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
import itertools


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
        try:
            self.conn.execute(command)
            self.conn.commit()
        except Exception as e:
            print(e)
            print(command)
            print(data)

    def insert_book_data(self, table_name, data):
        command = f"""INSERT INTO {table_name}({','.join(self.tables[table_name])}) VALUES ({','.join(['?' for i in range(len(data))])})"""
        try: 
            self.conn.execute(command, data)

            self.conn.commit()
        except Exception as e:
            print(e)
            print(command)
            print(data)


    def hashing_password(self, password):
        return self.binary_to_string(bcrypt.hashpw(password.encode('utf-8'), self.salt))

    def main(self):
        self.data = Data()
        self.create_database()
        self.fill_database()
        self.conn.close()

    def fill_database(self):

        self.clear_all()

        self.libraries = [
            ('0', 'University of Patra', '21.79127500966751,38.29039542648134',
             'Ypatias 4, Panepstimioupoli Patron, 265 04',
             '2610398949', 'bibliothiki@bilbo.gr',
             'img/card_library_1.png', 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vero possimus hic laboriosam perferendis, veritatis corrupti assumenda reprehenderit ducimus dignissimos quia, doloribus unde! Fugit quas minus est ex ratione dolor possimus!Lorem',
             '8:30 AM–7 PM,8:30 AM–7 PM,8:30 AM–7 PM,8:30 AM–7 PM,8:30 AM–7 PM,closed,closed'),
            
            
            ('1','Municipal Library of Patra', '21.732813401979747,38.24507192398973',
             'Maizonos 110, Patra 262 21',
             '261 022 4813', 
             'library@patrasculture.gr',
             'img/card_library_3.png', 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vero possimus hic laboriosam perferendis, veritatis corrupti assumenda reprehenderit ducimus dignissimos quia, doloribus unde! Fugit quas minus est ex ratione dolor possimus!Lorem',"8 AM–2:45 PM,8 AM–7:45 PM,8 AM–2:45 PM,8 AM–2:45 PM,8 AM–2:45 PM,Closed,Closed"),
           
            ('2', 'Municipal Library of Nafpaktos', '21.82946039128951,38.40070556275019',
             'Kozoni 12, Nafpaktos 303 00',
             '2634 027388', 
             'mail@vivl-nafpakt.ait.sch.gr',
             'img/card_library_2.png', 
             'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vero possimus hic laboriosam perferendis, veritatis corrupti assumenda reprehenderit ducimus dignissimos quia, doloribus unde! Fugit quas minus est ex ratione dolor possimus!Lorem',
             '08:00 AM–02:30 PM,07:00 AM–09:00 PM,07:00 AM–09:00 PM,07:00 AM–02:30 PM,07:00 AM–01:30 PM,closed,closed'),

             ('4','National Library Of Greece', '23.733036542730538,37.98120383072839',
              '32 Panepistimiou Street, Athens 106 79',
              '2103 382 541', 
              'nlg@nlg.gr',
              'img/card_library_4.png',
              'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vero possimus hic laboriosam perferendis, veritatis corrupti assumenda reprehenderit ducimus dignissimos quia, doloribus unde! Fugit quas minus est ex ratione dolor possimus!Lorem',
              '09:00 AM-08:00 PM,09:00 AM-08:00 PM,09:00 AM-08:00 PM,09:00 AM-08:00 PM,09:00 AM-08:00 PM,09:00 AM-08:00 PM,closed'
              )

        ]

        for library in self.libraries:
            self.insert_data('LIBRARY', library)

        def string_to_byte(string):
            return bytes(string, 'utf-8')

        for book in self.data.books:
            titles = ['isbn', 'title', 'authors', 'edition', 'publisher',
                      'release_date', 'genre', 'language', 'summary', 'cover_image']
            
            if book['isbn'] is not None:
                self.insert_book_data('BOOK', [book[key] if type(
                book[key]) is not list else ','.join(book[key]) for key in titles])

        # Users

        self.fill_copies()

        self.insert_data('USER', ('1', 'Nick', 'Fil','test@test.gr' ,'01/01/2001', self.hashing_password(
            'password'), self.binary_to_string(self.salt)))

        self.insert_data('USER', ('2', 'Konstantinos', 'Kotorenis','konstantinos.kotorenis@gmail.com', '30/2/1960', self.hashing_password(
            'password'), self.binary_to_string(self.salt)))

        borrowing_list = [ 
        ('9781118166321', '2', '1', '2023-05-01 10:00:00', '2023-05-02 11:00:00'),
        ('9781492094722', '2', '2', '2023-05-02 10:00:00', '2023-05-03 11:00:00'),
        ('IOWA:31858029579285', '0', '1', '2023-05-09 10:00:00', '2023-05-10 11:00:00'),
        ('9781449328566', '2', '1', '2023-05-09 10:00:00', '2023-05-10 11:00:00'),
        ('80471595', '0', '2', '2023-04-02 10:00:00', '2023-04-03 11:00:00'),
        ('321130073', '0', '2', '2023-05-15 10:00:00', '2023-05-16 11:00:00'),
        ('9781886420502', '0', '2', '2023-05-01 10:00:00', '2023-05-02 11:00:00'),
        ('9781638353713', '0', '2', '2023-05-11 10:00:00', '2023-05-12 11:00:00'),
        ('9781484202326', '2', '1', '2023-05-03 10:00:00', '2023-05-04 11:00:00')]

        for borrowing in borrowing_list:
            self.insert_data('Borrowing', borrowing )

        return_list = [
            ('9781118166321', '2', '1', '2023-05-10 10:00:00'),
        ('9781492094722', '2', '2', '2023-05-21 10:00:00'),
        ('9781449328566', '2', '1', '2023-05-21 10:00:00'),
        ('80471595', '0', '2', '2023-04-23 11:00:00'),
        ('321130073', '0', '2', '2023-05-20 10:00:00'),
        ]

        for return_ in return_list:
            self.insert_data('Return', return_ )


    def fill_copies(self):
        
        # print('\n'.join([book['isbn'] for book in self.data.books]))

        library_combo = []
        temp = list(map(int, [i[0] for i in self.libraries]))
        for i in range(1,len(self.libraries)+1):
            library_combo.extend(list(itertools.combinations(temp,i)))
        
        for book in self.data.books:         

            random_library = random.choice(library_combo)
            
            for library in random_library:
                copy_num = random.randint(1, 5)

                self.insert_data('COPIES', (book['isbn'], copy_num, library))


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

        # def books(num): 
        book_list = []

        if len(file.keys()) > 1 and 'items' in file.keys(): 
            for i in range(num%len(file['items'])):
                book = self.bookformat(file['items'][i])
                if book:    
                    book_list.append(book)
        return book_list    


    def bookformat(self, file):

        book = {i: None for i in ['title', 'publisher', 'authors', 'isbn','summary', 'cover_image', 'release_date', 'genre', 'language', 'edition']}

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

        if book['isbn']:
            print(f'isbn: {book["isbn"]} title: {book["title"]}')
            return book
        
        return None
    
    
    def load_books(self):
        self.books = []
        for title in self.get_titles():
            self.books += self.load_bookdata(title,num=1)
            # print([[i['isbn'],i['title']] for i in self.books])

    def save_bookdata(self, title):
        print(f'Getting data for {title}')
        def api_title(
            x): return f'https://www.googleapis.com/books/v1/volumes?q=title:{x}'
        def api_isbn(
            x): return f'https://www.googleapis.com/books/v1/volumes?q=isbn:{x}'

        def get_data(url): return requests.get(url).json()

        with open(f'{self.path}/{title}.json', 'w') as f:
            f.write(str(get_data(api_title(title))))

    def download_book_json(self, titles=None):
        if titles is None:
            with open('titles.py', 'r') as f:
                self.titles = eval(f.read())
        
        for title in self.titles:
            if os.path.exists(f'{self.path}/{title}.json'):
                continue
            self.save_bookdata(title.strip())
 
    def main(self):
        self.load_books()


if __name__ == '__main__':

    database = 'bilboData.sqlite'
    sqlfile = 'dbdesigner.sql'
    app = Creation(database, sqlfile)
    app.main()
