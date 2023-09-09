const XLSX = require('xlsx');
const fs = require('fs');

const inputFilePath = `./uploads/1694249981717-DSA Sheet.xlsx`; // Replace with your Excel file path

// Read the Excel file
const workbook = XLSX.readFile(inputFilePath);

// Get the first sheet (you can specify a specific sheet if needed)
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];

// Convert the worksheet to JSON
const jsonData = XLSX.utils.sheet_to_json(worksheet);

// Do something with the JSON data
console.log(jsonData);
