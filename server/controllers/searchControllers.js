// controllers/searchController.js

const pdf = require('pdf-parse');
const XLSX = require('xlsx');
const mammoth = require('mammoth');

// Function to search keyword in PDF document
async function searchKeywordInPDF(pdfBuffer, keyword) {
  const data = await pdf(pdfBuffer);
  const sentences = data.text.split(/[.!?]/); // Split text into sentences

  const results = [];
  sentences.forEach((sentence, index) => {
    if (sentence.toLowerCase().includes(keyword.toLowerCase())) {
      results.push({
        documentName: 'Your PDF Document', // Replace with actual document name
        sentence: sentence.trim(),
      });
    }
  });

  return results;
}

// Function to search keyword in Excel document
function searchKeywordInExcel(excelBuffer, keyword) {
  const XLSX = require('xlsx'); // Import the XLSX library if not already imported
  const workbook = XLSX.read(excelBuffer, { type: 'buffer' });
  const results = [];

  workbook.SheetNames.forEach((sheetName) => {
    const worksheet = workbook.Sheets[sheetName];
    const sheetData = XLSX.utils.sheet_to_json(worksheet);

    sheetData.forEach((row, rowIndex) => {
      let found = false;
      for (const key in row) {
        const cellValue = row[key];
        if (cellValue && cellValue.toString().toLowerCase().includes(keyword.toLowerCase())) {
          found = true;
          break; // No need to check other cells in the same row
        }
      }
      if (found) {
        results.push({
          documentName: 'Your Excel Document', // Replace with actual document name
          sheetName: sheetName,
          rowIndex: rowIndex + 1, // Adding 1 to match the row index in Excel
          rowData: row,
        });
      }
    });
  });

  return results;
}


// Function to search keyword in Word document (docx)
async function searchKeywordInWord(docxBuffer, keyword) {
  const { value } = await mammoth.extractRawText({ buffer: docxBuffer });

  const sentences = value.split(/[.!?]/); // Split text into sentences

  const results = [];
  sentences.forEach((sentence, index) => {
    if (sentence.toLowerCase().includes(keyword.toLowerCase())) {
      results.push({
        documentName: 'Your Word Document', // Replace with actual document name
        sentence: sentence.trim(),
      });
    }
  });

  return results;
}

// Export these functions to be used in your route handler

module.exports = {
  searchKeywordInPDF,
  searchKeywordInExcel,
  searchKeywordInWord,
};
