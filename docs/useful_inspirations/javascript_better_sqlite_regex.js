const Database = require('better-sqlite3');

// Create a new database instance
const db = new Database('your_database_file.db');

// Define the target phrase
const targetPhrase = 'hello world';

// Retrieve all phrases from the database
const rows = db.prepare('SELECT phrase FROM phrases').all();

// Perform regular expression matching on the retrieved data
const matchingPhrases = rows.filter(row => new RegExp(targetPhrase, 'i').test(row.phrase)).map(row => row.phrase);
console.log(matchingPhrases);

// Close the database connection
db.close();
