// routes/search.js

const express = require('express');
const router = express.Router();
const searchController = require('../controllers/searchControllers');

// POST endpoint for keyword search
router.post('/', async (req, res) => {
  const { documentType, documentBuffer, keyword } = req.body;

  try {
    let results = [];

    switch (documentType) {
      case 'pdf':
        results = await searchController.searchKeywordInPDF(documentBuffer, keyword);
        break;
      case 'excel':
        results = searchController.searchKeywordInExcel(documentBuffer, keyword);
        break;
      case 'word':
        results = await searchController.searchKeywordInWord(documentBuffer, keyword);
        break;
      default:
        return res.status(400).json({ message: 'Invalid document type' });
    }

    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while searching' });
  }
});

module.exports = router;
