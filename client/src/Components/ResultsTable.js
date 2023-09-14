import React from "react";

function ResultsTable({ results, query }) {
  console.log("query", query);

  // Function to highlight words in a sentence based on the search query
  const highlightWords = (sentence) => {
    if (!sentence) return ''; // Add this line to handle undefined or null sentence
    if (typeof sentence !== 'string') {
      return sentence; // Return as is if not a string
    }
    // Use a regular expression to match the query word(s) globally and case-insensitively
    const regex = new RegExp(`\\b(${query.replace(/\s+/g, "|")})\\b`, "gi");
  
    // Split the sentence into an array of words and highlight the matching ones
    const words = sentence.split(' ').map((word) => {
      if (regex.test(word)) {
        // Apply inline styles for highlighting using HTML span elements
        return `<span style="background-color: yellow; font-weight: bold;">${word}</span>`;
      }
      return word;
    });

    // Join the words back into a sentence with HTML
    return words.join(" ");
  };

  return (
    <div className="results-table">
      <table>
        <thead>
          <tr>
            <th>Document Name</th>
            <th>Sentence</th>
          </tr>
        </thead>
        <tbody>
          {results.map((result, index) => (
            <React.Fragment key={index}>
              {result.fileType === ".xlsx"
                ? // Special handling for XLSX files
                result.results.map((item, itemIndex) => (
                  <tr key={itemIndex}>
                    {itemIndex === 0 ? (
                      <td
                        rowSpan={result.results.length}
                        style={{ color: "black" }}
                      >
                        {result.fileName}
                      </td>
                    ) : null}
                    <td>
                      <pre>
                        {Object.keys(item.rowData).map((key) => (
                          <div key={key}>
                            {key}:{" "}
                            <span
                              dangerouslySetInnerHTML={{
                                __html: highlightWords(item.rowData[key]),
                              }}
                            />
                          </div>
                        ))}
                      </pre>
                    </td>
                  </tr>
                )
                  
                  
                  )
                : // Default handling for other file types
                  result.results.map((item, itemIndex) => (
                    <tr key={itemIndex}>
                      {itemIndex === 0 ? (
                        <td
                          rowSpan={result.results.length}
                          style={{ color: "black" }}
                        >
                          {result.fileName}
                        </td>
                      ) : null}
                      <td
                        dangerouslySetInnerHTML={{
                          __html: highlightWords(item.sentence),
                        }}
                      />
                    </tr>
                  ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ResultsTable;
