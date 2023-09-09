const express = require('express').Router
const multer = require('multer');
const fs = require('fs');
const uploadDir = 'uploads';
const app = express();
const path = require('path');
const { searchKeywordInPDF, searchKeywordInExcel, searchKeywordInWord } = require('../controllers/searchControllers'); // Import the search functions

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, 'uploads'); // Specify the directory where files will be stored
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Generate a unique filename
  },
});

const upload = multer({ storage });

// Handle file uploads
app.post('/api/upload', upload.array('files'), (req, res) => {
  res.status(200).json({ message: 'Files uploaded successfully' });
});

app.get('/api/search/:word', async (req, res) => {
    try {
      const keyword = req.params.word;
      const uploadPath = path.join(__dirname,'..', uploadDir); // Get the absolute path to the 'uploads' directory
  
      // Read the list of files in the 'uploads' directory
      fs.readdir(uploadPath, async (err, files) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ message: 'An error occurred while listing files' });
        }
  
        const searchResults = [];
  
        // Loop through each file and search for the keyword
        for (const file of files) {
          const filePath = path.join(uploadPath, file);
          const fileBuffer = fs.readFileSync(filePath);
  
          // Determine the file type based on the file extension
          const fileType = path.extname(file).toLowerCase();
  
          // Perform search based on file type
          let results = [];
          if (fileType === '.pdf') {
            results = await searchKeywordInPDF(fileBuffer, keyword);
          } else if (fileType === '.xlsx') {
            results = await searchKeywordInExcel(fileBuffer, keyword);
          } else if (fileType === '.docx') {
            results = await searchKeywordInWord(fileBuffer, keyword);
          }
  
          // Add the search results to the combined results array
          searchResults.push({
            fileName: file,
            fileType: fileType,
            results: results,
          });
        }
  
        res.json(searchResults);
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'An error occurred while searching' });
    }
  });
  
  app.post('/api/search', async (req, res) => {
    const { documentType, keyword } = req.body;
    // Check if the uploaded files are in the 'uploads' directory and select the appropriate search function
    try {
      if (documentType === 'pdf') {
        const pdfBuffer = fs.readFileSync(req.files[0].path); // Assuming the first file is the PDF
        const results = await searchKeywordInPDF(pdfBuffer, keyword);
        res.json(results);
      } else if (documentType === 'excel') {
        const excelBuffer = fs.readFileSync(req.files[0].path); // Assuming the first file is the Excel file
        const results = searchKeywordInExcel(excelBuffer, keyword);
        res.json(results);
      } else if (documentType === 'word') {
        const wordBuffer = fs.readFileSync(req.files[0].path); // Assuming the first file is the Word document
        const results = await searchKeywordInWord(wordBuffer, keyword);
        res.json(results);
      } else {
        res.status(400).json({ message: 'Invalid document type' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'An error occurred while searching' });
    }
  });

  module.exports=app