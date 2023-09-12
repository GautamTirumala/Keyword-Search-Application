import React, { useState } from 'react';
import axios from 'axios';

function SearchBar({ onSearch,setKeyword }) {

  const [query, setQuery] = useState('');

  const handleSearch = async () => {
    try {
      if(query === '') return alert('Enter Keyword(s) to SEARCH')
      const response = await axios.post(`http://localhost:5000/api/search`, { keyword: query });
    if(response.data === 'No files uploaded') return alert('Upload some pdf word excel files to search keyword')
    console.log('response',response);
      onSearch(response.data);
      setKeyword(query);
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
