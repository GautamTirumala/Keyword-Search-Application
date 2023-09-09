const mammoth = require('mammoth');
const fs = require('fs');
const colors = require('ansi-colors'); // For text highlighting

const inputFilePath = `./uploads/1694249998653-CRA.docx`; // Replace with your Word document file path
const searchWord = 'A +'; // Replace with the word you want to search for

// Read the Word document
fs.readFile(inputFilePath, (err, data) => {
  if (err) {
    console.error('Error reading file:', err);
    return;
  }

  // Convert the Word document to plain text
  mammoth.extractRawText({ buffer: data })
    .then((result) => {
      // The extracted content as plain text
      const plainText = result.value;
      console.log(plainText);

      // Split the plain text into lines
      const lines = plainText.split('.');

      // Search for the specific word in each line
      lines.forEach((line) => {
        if (line.includes(searchWord)) {
          // Highlight the word in the line and log it
          const highlightedLine = line.replace(
            new RegExp(searchWord, 'gi'), // 'gi' makes it case-insensitive
            (match) => colors.yellow.bold(match) // Highlight with ansi-colors
          );
          console.log(`Found in file : ${inputFilePath.slice(2)} \n ${highlightedLine}`);
        }
      });
    })
    .catch((error) => {
      console.error('Error extracting content:', error);
    });
});
