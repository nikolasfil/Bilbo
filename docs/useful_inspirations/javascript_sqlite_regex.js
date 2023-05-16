const sqlite3 = require('sqlite3').verbose();

// Create a new database instance
const db = new sqlite3.Database('your_database_file.db');

// Define the target phrase and the regular expression pattern
const targetPhrase = 'hello world';
const pattern = '\\b(hello).*\\b(world)\\b';

// Execute the query
const query = `SELECT phrase FROM phrases WHERE phrase REGEXP ? COLLATE NOCASE`;
db.all(query, [pattern], (err, rows) => {
  if (err) {
    console.error(err);
    return;
  }

  // Retrieve the matching phrases
  const matchingPhrases = rows.map((row) => row.phrase);
  console.log(matchingPhrases);
});

// Close the database connection
db.close();
