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


### Start the server with 

```bash
npm start
```

And it automatically loads the changes while working on the files.

Added a signedIn variable in the index.js (don't know how we will use it later )
So that it shows the login and register buttons only if the user is not signed in and the logout button only if the user is signed in.