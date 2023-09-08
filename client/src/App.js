import React, { useState } from 'react';
import './App.css'
import FileUpload from './Components/FileUpload';
import SearchBar from './Components/SearchBar';
import ResultsTable from './Components/ResultsTable';

function App() {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 10; // You can adjust the number of results per page

  const handleFileUpload = (files) => {
    // Handle uploaded files and update state
    setUploadedFiles(files);
  };

  const handleSearch = (results) => {
    // Handle search results and update state
    setSearchResults(results);
    setCurrentPage(1); // Reset to the first page of results
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastResult = currentPage * resultsPerPage;
  const indexOfFirstResult = indexOfLastResult - resultsPerPage;
  const currentResults = searchResults.slice(indexOfFirstResult, indexOfLastResult);

  return (
    <div className="App">
      <h1>Document Search App</h1>
      <FileUpload onUpload={handleFileUpload} />
      <SearchBar onSearch={handleSearch} />
      <ResultsTable results={currentResults} />
      <div className="pagination">
        {searchResults.length > resultsPerPage && (
          <ul>
            {Array.from({ length: Math.ceil(searchResults.length / resultsPerPage) }).map((_, index) => (
              <li key={index} onClick={() => paginate(index + 1)} className={currentPage === index + 1 ? 'active' : ''}>
                {index + 1}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;
