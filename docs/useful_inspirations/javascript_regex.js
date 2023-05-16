function findMatchingPhrases(targetPhrase, phrases) {
    // Split the target phrase into individual words
    const words = targetPhrase.split(" ");

    // Escape special characters in the words to avoid regex conflicts
    const escapedWords = words.map((word) => escapeRegExp(word));

    // Create the regular expression pattern
    const pattern = "\\b" + "\\b.*\\b" + escapedWords.join("\\b.*\\b") + "\\b";

    // Compile the pattern
    const regex = new RegExp(pattern, "i");

    // Find matching phrases
    const matchingPhrases = phrases.filter((phrase) => regex.test(phrase));

    return matchingPhrases;
}

// Helper function to escape special characters in a string
function escapeRegExp(string) {
    return string.replace(/[.*+\-?^${}()|[\]\\]/g, "\\$&");
}

// Example usage
const targetPhrase = "hello world";
const phrases = [
    "Hello, how are you today?",
    "I love the world",
    "This is a phrase containing hello",
    "The quick brown fox",
    "World, hello!"
];

const matchingPhrases = findMatchingPhrases(targetPhrase, phrases);
console.log(matchingPhrases);
