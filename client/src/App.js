import React, { useEffect, useState } from 'react';
import './App.css'
import axios from 'axios';
import FileUpload from './Components/FileUpload';
import SearchBar from './Components/SearchBar';
import ResultsTable from './Components/ResultsTable';

function App() {
  const [query, setQuery] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 10; // You can adjust the number of results per page

  useEffect(() => {
    // Attach an event listener to the window's beforeunload event to delete the uploads folder in the backend
    window.addEventListener('beforeunload', handleUnload);

    // Cleanup function to remove the event listener
    return () => {
      window.removeEventListener('beforeunload', handleUnload);
    };
  }, []);

  const handleQueryChange = (newQuery) => {
    setQuery(newQuery);
  };

  const handleUnload = async () => {
    try {
      // Send an HTTP request to your server to trigger the cleanup
      await axios.delete('http://localhost:5000/api/cleanup'); // API endpoint to delete uploads folder
    } catch (error) {
      console.error('Error during cleanup:', error);
    }
  };

 

  const handleFileUpload = (files) => {
    setUploadedFiles(files);
  };

  const handleSearch = (results) => {
    setSearchResults(results);
    console.log('searchResults from app' ,searchResults);
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
      <h1>Keyword-Search-Application</h1>
      <FileUpload onUpload={handleFileUpload} />
      <SearchBar onSearch={handleSearch} setKeyword={handleQueryChange}/>
      <ResultsTable results={currentResults} query={query} />
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
