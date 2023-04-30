#!/bin/python
import sqlite3 as sq
import sys
import datetime
from codecs import open
import bcrypt
import os 

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
        self.table_names = [table_name[0] for table_name in self.conn.execute('SELECT name FROM sqlite_master WHERE type="table"').fetchall()]
        # print(self.table_names)
        self.tables = {table_name: [column[1] for column in self.conn.execute(f'PRAGMA table_info({table_name})')] for table_name in self.table_names }
        # print([i for i in self.conn.execute("SELECT sql FROM sqlite_master WHERE tbl_name = 'table_name' AND type = 'table'")])
        #  "SELECT sql FROM sqlite_master WHERE tbl_name = 'table_name' AND type = 'table'"
        # print(self.tables)





    def clearing(self,tablename:str):
        '''clears the specific tablename from the values, but does not delete the columns'''
        self.conn.execute(f'DELETE FROM {tablename}')
        self.conn.commit()

    def clear_all(self):
        '''clears all tables'''
        for table in self.table_names:
            self.clearing(table)

    def fill_database(self):
        self.clear_all()    

        # Change the binary data !!! 

        # {'LIBRARY':   ['id', 'location', 'profile_picture', 'summary', 'working_hours'], 
        #  'BOOK':      ['isbn', 'title', 'author', 'edition', 'publisher', 'release', 'genre', 'language', 'summary', 'cover_image'], 
        #  'USER':      ['id', 'fname', 'lname', 'birthdate', 'password', 'salt', 'profile_picture'],
        #  'Borrowing': ['book_isbn', 'copy_num', 'library_id', 'user_id', 'date_borrowing', 'date_return'], 
        #  'Return':    ['book_isbn', 'copy_num', 'library_id', 'user_id', 'date_of_borrowing', 'date_of_return'],
        #  'COPIES':    ['book_isbn', 'copy_num']}
        
        # self.insert_data('LIBRARY',('a','location','profile_picture','summary','working_hours'))
        self.insert_data('LIBRARY',('University of Patra','Ypatias 4, Panepstimioupoli Patron, 265 04','img/library_image_1.svg','Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vero possimus hic laboriosam perferendis, veritatis corrupti assumenda reprehenderit ducimus dignissimos quia, doloribus unde! Fugit quas minus est ex ratione dolor possimus!Lorem','Monday:	8:30 AM–7 PMTuesday:	8:30 AM–7 PM,Wednesday:	8:30 AM–7 PM,Thursday:	8:30 AM–7 PM,Friday:	8:30 AM–7 PM,Saturday:	closed,Sunday:	closed'))
        self.insert_data('LIBRARY',('Not','location','img/library_image_1.svg','summary','working_hours'))

        
        
        self.insert_data('BOOK',('isbn','title','author','edition','publisher','release','genre','language',
        'summary','cover_image'))
        
        self.insert_data('COPIES',('book_isbn','1'))

        # Users
        self.insert_data('USER',('id','fname','lname','birthdate',self.hashing_password('password') ,self.binary_to_string(self.salt),'profile_picture'))
        
        self.insert_data('Borrowing',('book_isbn','copy_num','library_id','user_id','date_borrowing','date_return'))
        
        self.insert_data('Return',('book_isbn','copy_num','library_id','user_id','date_of_borrowing','date_of_return'))
        

    # make it clearer
    
    def double_quoting(self, string):
        return f"'{str(string)}'"
    
    def binary_to_string(self,string):
        # return f"'{str(string)[2:-1]}'"
        return f"{str(string)[2:-1]}"

    def insert_data(self,table_name,data):
        command = f"INSERT INTO {table_name}({','.join(self.tables[table_name])}) VALUES ({','.join(list(map(self.double_quoting,data)))})"
        print(command)
        self.conn.execute(command)
        self.conn.commit()
    

    def hashing_password(self,password):
        return self.binary_to_string(bcrypt.hashpw(password.encode('utf-8'),self.salt))


    def main(self):
        self.create_database()
        self.fill_database()
        self.conn.close()
        
    
class Data: 
    def __innit__(self):
        pass
    
    def get_titles(self):
        from os import listdir 
        from os.path import isfile, join

        path = '../bookdata'
        files = [f for f in listdir(path) if isfile(join(path, f))]
        return files


    def load_bookdata(self,title, num=1):

        with open(f'../bookdata/{title}', 'r') as f:
            file = eval(f.read())

        def books(num): return [self.bookformat(file['items'][i]) for i in range(num)]

        return books(num)


    def bookformat(self,file):

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


    def get_data(self):
        books = []
        for title in self.get_titles():
            books += self.load_bookdata(title)
        return books


if __name__ == '__main__':
    
    data = Data()
    # print(data.get_data())
    
    database ='data.db'
    sqlfile = 'dbdesigner.sql'
    app = Creation(database, sqlfile)
    app.main()
