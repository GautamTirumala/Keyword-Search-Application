const express = require('express');
const multer = require('multer');
const cors = require('cors');
const fs = require('fs');
const uploadDir = 'uploads';
const app = express();
const port = 5000;

const { searchKeywordInPDF, searchKeywordInExcel, searchKeywordInWord } = require('./controllers/searchController'); // Import the search functions

app.use(cors());

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

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
