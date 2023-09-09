const fs = require('fs');
const pdf = require('pdf-parse');
const path = require('path');

const directoryPath = './uploads';

// Read the files in the directory
const files = fs.readdirSync(directoryPath);

// Extract and print the extensions
files.forEach((file) => {
  const fileExtension = path.extname(file);
  console.log(`File: ${file}, Extension: ${fileExtension}`);
});

// const files = fs.readdirSync('./uploads');
// console.log(files);
// console.log(files[0]);

files.forEach((file)=>{
    // console.log(file);

    // let dataBuffer = fs.readFileSync(`./uploads/${file}`);
 
// pdf(dataBuffer).then(function(data) {
 
//     // number of pages
//     console.log(data.numpages);
//     // number of rendered pages
//     console.log(data.numrender);
//     // PDF info
//     console.log(data.info);
//     // PDF metadata
//     console.log(data.metadata); 
//     // PDF.js version
//     // check https://mozilla.github.io/pdf.js/getting_started/
//     console.log(data.version);
//     // PDF text
//     console.log(data.text); 
        
// });
})
