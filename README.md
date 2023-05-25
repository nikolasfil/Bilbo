# Εφαρμογή Διαχειρισης Δικτυου Βιβλιοθηκων
# Application Library Management 

---

##### Description 



URL: [https://bilbolibrary.herokuapp.com](https://bilbolibrary.herokuapp.com)

---

### Building the application 

###### Install the dependencies 

```bash
npm install nodemon -g #suggested for development
```

```bash
npm install
```

The previous command will download all the dependencies and install them in the node_modules folder.

It gets the dependencies from the package.json file. The dependencies are listed in the dependencies section and are added there everytime we install a new dependency with npm install .



###### Database

To create the database, move into the model folder and run the program database_management.py 

```bash
python3 database_managing.py
```
 

The python program [database_managing.py file](model/database_managing.py) looks for the database file (bilboData.sqlite) and if it doesn't it creates it . 
It builds the sql database from the file [dbdesigner.sql](/model/dbdesigner.sql) . 

If the folder [bookdata](model/bookdata) does not exist, it is created and the titles from the file [titles.py](model/titles.py) are downloaded as json files and stored inside bookdata and then loaded in the database . 
Currently the datbase has 2 users, but sign up is working properly so more can be added. There is no admin user . 

The libraries, borrowing, returning tables are loaded from the files [librarie.py](model/libraries.py) , [borrowing.py](model/borrowing.py), [return.py](model/return.py)

If there are no errors the database is created successfully . 

---

### Running the server locally 


###### Running it with nodemon

```bash
npm start
```
And it automatically loads the changes while working on the files.

**OR**

###### Running it with node

```bash
npm run startWebsite
```
It runs node index.js


---

###### Running it with docker 

Building the image 
```bash
docker build -t my-node-project .
```

Running the image 
```bash
docker run -d -p 8080:8080 my-node-project
```

---

Then head over to [localhost:8080](http://localhost:8080)  

