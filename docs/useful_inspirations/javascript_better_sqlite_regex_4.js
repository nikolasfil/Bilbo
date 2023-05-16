function generateRegexPattern(phrase, commonWords) {
    // Escape special characters in the phrase
    const escapedPhrase = phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    // Split the phrase into individual words
    const words = escapedPhrase.split(/\s+/);

    // Filter out common words from partial search
    const partialWords = words.filter(word => !commonWords.includes(word));

    // Generate the regular expression pattern
    const partialPattern = partialWords
        .map(word => `(?:\\b|\\B)${escapeRegex(word)}\\w*(?:\\b|\\B)`)
        .join('|');
    const exactPattern = `\\b${escapedPhrase}\\b`;

    return new RegExp(`(?:${partialPattern}|${exactPattern})`, 'i');
}

function escapeRegex(string) {
    return string.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
}

function fuzzySearch(phrase, target, commonWords) {
    const regexPattern = generateRegexPattern(phrase, commonWords);
    return regexPattern.test(target);
}

// Example usage
const phrase = 'hello world';
const target = 'hele wrold';
const commonWords = ['world'];
const isMatch = fuzzySearch(phrase, target, commonWords);
console.log(isMatch);
