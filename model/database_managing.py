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

        with open('libraries.py', 'r') as f:
            self.libraries = eval(f.read())


        with open('borrowing.py','r') as f:
            self.borrowing_list = eval(f.read())


        with open('return.py','r') as f:
            self.return_list = eval(f.read())



        # ----------------- Libraries -----------------


        for library in self.libraries:
            self.insert_data('LIBRARY', library)


        
        # ----------------- Books -----------------

        for book in self.data.books:
            titles = ['isbn', 'title', 'authors', 'edition', 'publisher',
                      'release_date', 'genre', 'language', 'summary', 'cover_image']
            
            if book['isbn'] is not None:
                self.insert_book_data('BOOK', [book[key] if type(
                book[key]) is not list else ','.join(book[key]) for key in titles])


        # ----------------- Copies -----------------

        self.fill_copies()


        # ----------------- Users -----------------

        self.insert_data('USER', ('1', 'Nick', 'Fil','test@test.gr' ,'01/01/2001', self.hashing_password(
            'password'), self.binary_to_string(self.salt)))

        self.insert_data('USER', ('2', 'Konstantinos', 'Kotorenis','konstantinos.kotorenis@gmail.com', '30/2/1960', self.hashing_password(
            'password'), self.binary_to_string(self.salt)))



        # ----------------- Borrowing and Return -----------------

        # print(self.borrowing_list)

        for i in range(len(self.borrowing_list)):
            # isbn position 0 
            self.borrowing_list[i][0] =  self.books_for_borrow[i][0]
            self.borrowing_list[i][1] =  self.books_for_borrow[i][1]
        

        

        for borrowing in self.borrowing_list:
            self.insert_data('Borrowing', borrowing )


        for i in range(len(self.return_list)):
            # isbn position 0 
            self.return_list[i][0] =  self.books_for_borrow[i][0]
            self.return_list[i][1] =  self.books_for_borrow[i][1]


        for return_ in self.return_list:
            self.insert_data('Return', return_ )




    def fill_copies(self):
        
        # print('\n'.join([book['isbn'] for book in self.data.books]))
        self.books_for_borrow = []

        library_combo = []
        temp = list(map(int, [i[0] for i in self.libraries]))
        for i in range(1,len(self.libraries)+1):
            library_combo.extend(list(itertools.combinations(temp,i)))
        
        for book in self.data.books:         

            random_library = random.choice(library_combo)
            
            for library in random_library:
                copy_num = random.randint(1, 5)
                
                self.insert_data('COPIES', (book['isbn'], copy_num, library))


            self.books_for_borrow.append((book['isbn'], random_library[0]))

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
