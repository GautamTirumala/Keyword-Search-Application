const express = require('express');
const multer = require('multer');
const cors = require('cors');
const fs = require('fs');
const uploadDir = 'uploads';
const path = require('path');
const app = express();
const port = 5000;

const { searchKeywordInPDF, searchKeywordInExcel, searchKeywordInWord } = require('./controllers/searchControllers'); // Import the search functions

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, 'uploads');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage });

app.post('/api/upload', upload.array('files'), (req, res) => {
  res.status(200).json({ message: 'Files uploaded successfully' });
});

app.delete('/api/cleanup', (req, res) => {
  if (!fs.existsSync(uploadDir)) {
    res.status(200).send('All good! Can move forward.');
  } else {
    try {
      // Use fs.rm to remove the directory recursively
      fs.rm(uploadDir, { recursive: true }, (error) => {
        if (error) {
          console.error('Error during directory removal:', error);
          res.status(500).send('Error during directory removal.');
        } else {
          res.status(200).send('Directory deleted successfully.');
        }
      });
    } catch (error) {
      console.error('Error during cleanup:', error);
      res.status(500).send('Error during cleanup.');
    }
    
  }
});



app.post('/api/search', async (req, res) => {
  try {
    const { keyword } = req.body;
    if (!fs.existsSync(uploadDir)) {
      return res.send('No files uploaded')
    }
    const uploadPath = path.join(__dirname, uploadDir); // Get the absolute path to the 'uploads' directory

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

        const filename = file;
        const pattern = /^\d{13}-/;
        const fileNameWithoutDate = filename.replace(pattern, '');

        // Add the search results to the combined results array
        searchResults.push({
          fileName: fileNameWithoutDate,
          fileType:fileType,
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

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});




app.get('/api/search', async (req, res) => {
  try {
    const keyword = "3sum";
    const uploadPath = path.join(__dirname, uploadDir); // Get the absolute path to the 'uploads' directory

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

        const filename = file;
        const pattern = /^\d{13}-/;
        const fileNameWithoutDate = filename.replace(pattern, '');

        // Add the search results to the combined results array
        searchResults.push({
          fileName: fileNameWithoutDate,
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