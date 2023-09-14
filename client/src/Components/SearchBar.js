import React, { useState } from "react";
import axios from "axios";

function SearchBar({ onSearch, setKeyword }) {
  // State to store the search query
  const [query, setQuery] = useState("");

  // Function to handle the search
  const handleSearch = async () => {
    try {
      // Check if the query is empty and display an alert if it is
      if (query === "") return alert("Enter Keyword(s) to SEARCH");

      // Send a POST request to the server to perform the search
      const response = await axios.post(`http://localhost:5000/api/search`, {
        keyword: query,
      });

      // Check if the response indicates that no files were uploaded and display an alert
      if (response.data === "No files uploaded")
        return alert(
          "Upload some PDF, Word, or Excel files to search for keywords"
        );

      // Log the response data and trigger the search callback
      console.log("response", response);
      onSearch(response.data);

      // Set the keyword in the parent component
      setKeyword(query);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="search-bar">
      {/* Input field for entering search keywords */}
      <input
        type="text"
        placeholder="Enter keywords..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {/* Button to initiate the search */}
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}

export default SearchBar;
