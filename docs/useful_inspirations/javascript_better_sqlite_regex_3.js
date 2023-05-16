const Database = require('better-sqlite3');

// Create a new database instance
const db = new Database('your_database_file.db');

// Define the given phrase
const givenPhrase = 'Hello, how are you?';

// Split the given phrase into individual words
const words = givenPhrase.split(/\s+/);

// Prepare the query statement with placeholders
const placeholders = words.map(() => 'LOWER(title) LIKE ?').join(' OR ');
const query = db.prepare(`SELECT attribute1, attribute2, attribute3 FROM your_table WHERE ${placeholders}`);

// Bind the values to the placeholders and execute the query
const result = query.all(words.map(word => `%${word.toLowerCase()}%`));

// Log the resulting attributes
console.log(result);

// Close the database connection
db.close();
