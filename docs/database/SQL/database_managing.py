#!/bin/python
import sqlite3 as sq
import sys
import datetime
from codecs import open
import bcrypt


# https://www.tutorialspoint.com/sqlite/sqlite_python.htm

# database='../dbdesigner/database-data'
# needs to run in the Program Folder


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
        
        self.insert_data('LIBRARY',('a','location','profile_picture','summary','working_hours'))
        
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
        
    



if __name__ == '__main__':
    database ='data.db'
    sqlfile = 'dbdesigner.sql'
    app = Creation(database, sqlfile)
    app.main()
