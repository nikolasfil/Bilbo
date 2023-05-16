In JavaScript, you can use the `RegExp` function to create a regular expression object. The `RegExp` function allows you to define patterns and perform operations such as matching, searching, and replacing based on those patterns. Here are a few examples of how to use the `RegExp` function:

1. Creating a Regular Expression:
   ```javascript
   const pattern = new RegExp('hello'); // Creates a regular expression that matches the word 'hello'
   const pattern = /hello/; // A shorter syntax using regex literal
   ```

2. Matching a String:
   ```javascript
   const str = 'Hello, World!';
   const pattern = /hello/i; // Case-insensitive match for 'hello'
   const result = pattern.test(str); // Returns true if 'hello' is found in the string
   ```

3. Searching and Extracting:
   ```javascript
   const str = 'Hello, World!';
   const pattern = /o/g; // Global search for 'o'
   const matches = str.match(pattern); // Returns an array with all 'o' occurrences ['o', 'o']
   ```

4. Replacing Matches:
   ```javascript
   const str = 'Hello, World!';
   const pattern = /world/i; // Case-insensitive match for 'world'
   const replaced = str.replace(pattern, 'Universe'); // Replaces 'World' with 'Universe'
   ```

5. Extracting Substrings:
   ```javascript
   const str = 'Hello, World!';
   const pattern = /lo/; // Match for 'lo'
   const match = str.match(pattern); // Returns an array with the first match ['lo']
   const index = str.search(pattern); // Returns the index of the first match 3
   ```

These examples demonstrate some of the common use cases for the `RegExp` function. You can adjust the regular expression pattern and the target string according to your specific needs.