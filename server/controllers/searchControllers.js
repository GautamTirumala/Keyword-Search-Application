const pdf = require("pdf-parse");
const XLSX = require("xlsx");
const mammoth = require("mammoth");

// Function to search a keyword in a PDF document
async function searchKeywordInPDF(pdfBuffer, keyword) {
  // Parse the PDF document into text
  const data = await pdf(pdfBuffer);
  // Split text into sentences using common sentence-ending punctuation
  const sentences = data.text.split(/[.!?]/);

  const results = [];
  sentences.forEach((sentence, index) => {
    // Check if the sentence contains the keyword (case-insensitive)
    if (sentence.toLowerCase().includes(keyword.toLowerCase())) {
      results.push({
        // documentName: 'Your PDF Document', // Replace with actual document name
        sentence: sentence.trim(),
      });
    }
  });

  return results;
}

// Function to search a keyword in an Excel document
function searchKeywordInExcel(excelBuffer, keyword) {
  // Parse the Excel document from the buffer
  const workbook = XLSX.read(excelBuffer, { type: "buffer" });
  const results = [];

  workbook.SheetNames.forEach((sheetName) => {
    const worksheet = workbook.Sheets[sheetName];
    const sheetData = XLSX.utils.sheet_to_json(worksheet);

    sheetData.forEach((row, rowIndex) => {
      let found = false;
      for (const key in row) {
        const cellValue = row[key];
        if (
          cellValue &&
          cellValue.toString().toLowerCase().includes(keyword.toLowerCase())
        ) {
          found = true;
          break; // No need to check other cells in the same row
        }
      }
      if (found) {
        results.push({
          // documentName: 'Your Excel Document', // Replace with actual document name
          sheetName: sheetName,
          rowIndex: rowIndex + 1, // Adding 1 to match the row index in Excel
          rowData: row,
        });
      }
    });
  });

  return results;
}

// Function to search a keyword in a Word document (docx)
async function searchKeywordInWord(docxBuffer, keyword) {
  // Extract raw text from the Word document
  const { value } = await mammoth.extractRawText({ buffer: docxBuffer });
  // Split text into sentences using common sentence-ending punctuation
  const sentences = value.split(/[.!?]/);

  const results = [];
  sentences.forEach((sentence, index) => {
    // Check if the sentence contains the keyword (case-insensitive)
    if (sentence.toLowerCase().includes(keyword.toLowerCase())) {
      results.push({
        // documentName: 'Your Word Document', // Replace with actual document name
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
