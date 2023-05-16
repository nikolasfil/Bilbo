const Database = require('better-sqlite3');

// Create a new database instance
const db = new Database('your_database_file.db');

// Define the given list of titles
const titleList = ['title1', 'title2', 'title3'];

// Prepare the query statement with placeholders
const query = db.prepare(`SELECT attribute1, attribute2, attribute3 FROM your_table WHERE title IN (${titleList.map(() => '?').join(', ')})`);

// Bind the values to the placeholders and execute the query
const result = query.all(titleList);

// Log the resulting attributes
console.log(result);

// Close the database connection
db.close();
