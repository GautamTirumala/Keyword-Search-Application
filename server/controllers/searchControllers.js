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
  const workbook = XLSX.read(excelBuffer, { type: 'buffer' });
  const results = [];

  workbook.SheetNames.forEach((sheetName) => {
    const worksheet = workbook.Sheets[sheetName];
    const sheetData = XLSX.utils.sheet_to_json(worksheet);

    sheetData.forEach((row, rowIndex) => {
      for (const key in row) {
        const cellValue = row[key];
        if (cellValue && cellValue.toString().toLowerCase().includes(keyword.toLowerCase())) {
          results.push({
            documentName: 'Your Excel Document', // Replace with actual document name
            sentence: `Sheet: ${sheetName}, Row: ${rowIndex + 1}, Column: ${key}`,
          });
        }
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
