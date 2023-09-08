import React, { useState } from 'react';
import axios from 'axios';

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleSearch = async () => {
    try {
      const response = await axios.get(`/api/search?q=${query}`);
      onSearch(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Enter keywords..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}

export default SearchBar;
