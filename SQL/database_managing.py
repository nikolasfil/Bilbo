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
        except Exception as e:
            print(e)
            sys.exit()
    
    def create_database(self):
        sql = open(self.sqlfile, 'r', encoding='utf-8-sig').read()
        self.conn.executescript(sql)
        self.tables = [table_name[0] for table_name in self.conn.execute('SELECT name FROM sqlite_master WHERE type="table"').fetchall()]
        # print(self.tables)
        

    def fill_database(self):
        pass

    def main(self):
        self.create_database()
        self.fill_database()
        self.conn.close()
        
    



if __name__ == '__main__':
    database ='data.db'
    sqlfile = 'dbdesigner.sql'
    app = Creation(database, sqlfile)
    app.main()
