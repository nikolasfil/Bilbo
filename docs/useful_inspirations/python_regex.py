import re

# identifies 

def find_matching_phrases(target_phrase, phrases):
    # Split the target phrase into individual words
    words = target_phrase.split()

    # Escape special characters in the words to avoid regex conflicts
    escaped_words = [re.escape(word) for word in words]
    
    # Create the regular expression pattern
    pattern = r"\b" + r"\b.*\b".join(escaped_words) + r"\b"
    # print(pattern)
    # Compile the pattern
    regex = re.compile(pattern, re.IGNORECASE)

    # Find matching phrases
    matching_phrases = [phrase for phrase in phrases if regex.search(phrase)]

    return matching_phrases

# Example usage
target_phrase = "hello world"
phrases = [
    "Hello, how are you today?",
    "I love the world",
    "This is a phrase containing hello",
    # "The quick brown fox",
    "World, hello!"
]

matching_phrases = find_matching_phrases(target_phrase, phrases)
print(matching_phrases)
