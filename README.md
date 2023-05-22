## Εφαρμογή Διαχειρισης Δικτυου Βιβλιοθηκων 

To run it locally : 

```bash
npm install nodemon -g #suggested for development
```

```bash
npm install
```
The previous command will download all the dependencies and install them in the node_modules folder.
It gets the dependencies from the package.json file. The dependencies are listed in the dependencies section and are added there everytime we install a new dependency with npm install . 


### Start the server with nodemon

```bash
npm start
```

And it automatically loads the changes while working on the files.


### Start the server with node 

```bash 
npm run startWebsite 
```

It runs node index.js 


---

### Database

cd to the model folder and run the following command to create the database

```bash
python database_managment.py
```

It will look for two things, if a bilboData.sqlite exists , it will create it if it doesnt, and a bookdata folder, which if it does not exist it will automatically create it and download the books from the internet.

