const fs = require('fs');
const stringSimilarity = require('string-similarity');

// Function to search for matches in JSON files
function searchJSONFiles(files, phrase) {
    const matches = [];

    // Iterate through each file
    for (const file of files) {
        const data = fs.readFileSync(file, 'utf8');
 
        const jsonData = JSON.parse(data);

        // Search for matches in each JSON object
        for (const obj of jsonData) {
            // Convert object properties to strings for comparison
            const objValues = Object.values(obj).map(value => value.toString());

            // Calculate string similarity scores
            const scores = stringSimilarity.findBestMatch(phrase, objValues);

            // Threshold for considering a match
            const threshold = 0.5;

            // Check if any score exceeds the threshold
            const hasMatch = scores.ratings.some(score => score.rating > threshold);

            if (hasMatch) {
                matches.push({
                    file,
                    object: obj,
                    score: scores.bestMatch.rating
                });
            }
        }
    }

    return matches;
}

// Usage example
const files = ['file1.json', 'file2.json', 'file3.json'];
const phrase = 'search phrase';

const searchResults = searchJSONFiles(files, phrase);
console.log('Search results:', searchResults);