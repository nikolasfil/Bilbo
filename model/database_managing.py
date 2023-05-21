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
        self.conn.execute(command)
        self.conn.commit()

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
        ('9781118166321', '2', '1', '2023-05-01 10:00:00 UTC', '2023-05-02 11:00:00 UTC'),
        ('9781492094722', '2', '2', '2023-05-02 10:00:00 UTC', '2023-05-03 11:00:00 UTC'),
        ('IOWA:31858029579285', '0', '1', '2023-05-09 10:00:00 UTC', '2023-05-10 11:00:00 UTC'),
        ('9781449328566', '2', '1', '2023-05-09 10:00:00 UTC', '2023-05-10 11:00:00 UTC'),
        ('80471595', '0', '2', '2023-04-02 10:00:00 UTC', '2023-04-03 11:00:00 UTC'),
        ('321130073', '0', '2', '2023-05-15 10:00:00 UTC', '2023-05-16 11:00:00 UTC'),
        ('9781886420502', '0', '2', '2023-05-01 10:00:00 UTC', '2023-05-02 11:00:00 UTC'),
        ('9781638353713', '0', '2', '2023-05-11 10:00:00 UTC', '2023-05-12 11:00:00 UTC'),
        ('9781484202326', '2', '1', '2023-05-03 10:00:00 UTC', '2023-05-04 11:00:00 UTC')]

        for borrowing in borrowing_list:
            self.insert_data('Borrowing', borrowing )

        return_list = [
            ('9781118166321', '2', '1', '2023-05-10 10:00:00 UTC'),
        ('9781492094722', '2', '2', '2023-05-21 10:00:00 UTC'),
        ('9781449328566', '2', '1', '2023-05-21 10:00:00 UTC'),
        ('80471595', '0', '2', '2023-04-23 11:00:00 UTC'),
        ('321130073', '0', '2', '2023-05-20 10:00:00 UTC'),
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

        for i in range(num%len(file['items'])):
            book = self.bookformat(file['items'][i])
            if book:    
                book_list.append(book)
        return book_list    
        
            # return [self.bookformat(file['items'][i]) for i in range(num % len(file['items']))] 
        # return books(num)

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
            self.titles = ['python', 'java', 'javascript', 'html', 'css', 'php', 'sql', 'ruby', 'perl', 'r', 'go', 'swift', 'kotlin', 'rust', 'typescript', 'bash', 'powershell', 'matlab', 'assembly', 'vba', 'visual basic', 'dart', 'groovy', 'scala',
                           'history', 'calculus',
                           'the lord of the rings', 'the hobbit', 'the silmarillion', 'the children of hurin', 'the fall of gondolin', 'the book of lost tales',  'the lay of aotrou and itroun', 'the lay of leithian', 'the shaping of middle-earth', 'the lost road and other writings', 'the return of the shadow', 'the treason of isengard', 'the war of the ring', 'sauron defeated', 'morgoths ring', 'the war of the jewels', 'the peoples of middle-earth', 'ready player one', 

                "Romeo and Juliet by William Shakespeare ",
                "Moby Dick; Or, The Whale by Herman Melville ",
                "A Room with a View by E. M. Forster ",
                "Middlemarch by George Eliot ",
                "Little Women; Or, Meg, Jo, Beth, and Amy by Louisa May Alcott ",
                "The Complete Works of William Shakespeare by William Shakespeare ",
                "The Blue Castle: a novel by L. M. Montgomery ",
                "The Enchanted April by Elizabeth Von Arnim ",
                "The Adventures of Ferdinand Count Fathom — Complete by T. Smollett ",
                "Cranford by Elizabeth Cleghorn Gaskell ",
                "The Expedition of Humphry Clinker by T. Smollett ",
                "History of Tom Jones, a Foundling by Henry Fielding ",
                "The Adventures of Roderick Random by T. Smollett ",
                "Twenty Years After by Alexandre Dumas ",
                "My Life — Volume 1 by Richard Wagner ",
                "Pride and Prejudice by Jane Austen ",
                "The Picture of Dorian Gray by Oscar Wilde ",
                "Frankenstein; Or, The Modern Prometheus by Mary Wollstonecraft Shelley ",
                "Noli Me Tangere by José Rizal ",
                "Alice's Adventures in Wonderland by Lewis Carroll ",
                "Ang Filibusterismo (Karugtóng ng Noli Me Tangere) by José Rizal ",
                "The slang dictionary : by John Camden Hotten ",
                "The Yellow Wallpaper by Charlotte Perkins Gilman ",
                "War and Peace by graf Leo Tolstoy ",
                "Dracula by Bram Stoker ",
                "The Great Gatsby by F. Scott Fitzgerald ",
                "A Tale of Two Cities by Charles Dickens ",
                "The Importance of Being Earnest: A Trivial Comedy for Serious People by Oscar Wilde ",
                "The Adventures of Sherlock Holmes by Arthur Conan Doyle ",
                "The Count of Monte Cristo, Illustrated by Alexandre Dumas ",
                "Jane Austen and her works by Sarah Tytler ",
                "The Brothers Karamazov by Fyodor Dostoyevsky ",
                "Metamorphosis by Franz Kafka ",
                "The Terriford mystery by Marie Belloc Lowndes ",
                "Ulysses by James Joyce ",
                "Crime and Punishment by Fyodor Dostoyevsky ",
                "A Doll's House : a play by Henrik Ibsen ",
                "The Romance of Lust: A classic Victorian erotic novel by Anonymous ",
                "The Kama Sutra of Vatsyayana by Vatsyayana ",
                "The accomplisht cook by Robert May ",
                "After world's end by Jack Williamson ",
                "The Prince by Niccolò Machiavelli ",
                "Florante at Laura by Francisco Balagtas ",
                "The Reign of Greed by José Rizal ",
                "Grimms' Fairy Tales by Jacob Grimm and Wilhelm Grimm ",
                "Great Expectations by Charles Dickens ",
                "Jane Eyre: An Autobiography by Charlotte Brontë ",
                "Tractatus Logico-Philosophicus by Ludwig Wittgenstein ",
                "The Strange Case of Dr. Jekyll and Mr. Hyde by Robert Louis Stevenson ",
                "Lost on Venus by Edgar Rice Burroughs ",
                "Adventures of Huckleberry Finn by Mark Twain ",
                "The Philippines a Century Hence by José Rizal ",
                "The Wonderful Wizard of Oz by L. Frank Baum ",
                "The Iliad by Homer ",
                "Meditations by Emperor of Rome Marcus Aurelius ",
                "A Modest Proposal by Jonathan Swift ",
                "Marcia Schuyler by Grace Livingston Hill ",
                "The story of Eros & Psyche (retold from Apuleius) : by Edward Carpenter ",
                "Don Quixote by Miguel de Cervantes Saavedra ",
                "Beyond Good and Evil by Friedrich Wilhelm Nietzsche ",
                "Darwin by Gamaliel Bradford ",
                "Treasure Island by Robert Louis Stevenson ",
                "The Adventures of Tom Sawyer, Complete by Mark Twain ",
                "Moby Multiple Language Lists of Common Words by Grady Ward ",
                "Gloria : by Emma Dorothy Eliza Nevitte Southworth ",
                "The Scarlet Letter by Nathaniel Hawthorne ",
                "Scream at midnight by Joseph Payne Brennan ",
                "Edith Lyle : by Mary Jane Holmes ",
                "Thus Spake Zarathustra: A Book for All and None by Friedrich Wilhelm Nietzsche ",
                "The History of the Decline and Fall of the Roman Empire by Edward Gibbon ",
                "Anne of Green Gables by L. M. Montgomery ",
                "The Prophet by Kahlil Gibran ",
                "Walden, and On The Duty Of Civil Disobedience by Henry David Thoreau ",
                "Overland through Asia; Pictures of Siberian, Chinese, and Tartar Life by Thomas Wallace Knox ",
                "Tarzan at the Earth's core by Edgar Rice Burroughs ",
                "Wuthering Heights by Emily Brontë ",
                "Hand-book on cheese making by Geo. E. Newell ",
                "Peter Pan by J. M. Barrie ",
                "The Odyssey by Homer ",
                "Calculus Made Easy by Silvanus P. Thompson ",
                "Anna Karenina by graf Leo Tolstoy ",
                "The divine comedy by Dante Alighieri ",
                "The Rámáyan of Válmíki, translated into English verse by Valmiki ",
                "Les Misérables by Victor Hugo ",
                "The Tragical History of Doctor Faustus by Christopher Marlowe ",
                "The dramatic instinct in children ",
                "Winnie-the-Pooh by A. A. Milne ",
                "The Republic by Plato ",
                "Emma by Jane Austen ",
                "The War of the Worlds by H. G. Wells ",
                "The Hound of the Baskervilles by Arthur Conan Doyle ",
                "The Time Machine by H. G. Wells ",
                "Little Women by Louisa May Alcott ",
                "The Jungle Book by Rudyard Kipling ",
                "Demonology and Devil-lore by Moncure Daniel Conway ",
                "A Study in Scarlet by Arthur Conan Doyle ",
                "Dubliners by James Joyce ",
                "Siddhartha by Hermann Hesse ",
                "The King in Yellow by Robert W. Chambers ",
                "The King James Version of the Bible" 
        
                           ]

        for title in self.titles:
            self.save_bookdata(title)

    def main(self):
        self.load_books()


if __name__ == '__main__':

    database = 'bilboData.sqlite'
    sqlfile = 'dbdesigner.sql'
    app = Creation(database, sqlfile)
    app.main()
