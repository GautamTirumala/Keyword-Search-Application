import React from 'react';

function ResultsTable({ results }) {
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
              {result.fileType === ".xlsx" ? (
                // Special handling for XLSX files
                result.results.map((item, itemIndex) => (
                  <tr key={itemIndex}>
                    {itemIndex === 0 ? (
                      <td rowSpan={result.results.length} style={{ color: "black" }}>
                        {result.fileName}
                      </td>
                    ) : null}
                    <td>{item.rowData.__EMPTY}</td>
                  </tr>
                ))
              ) : (
                // Default handling for other file types
                result.results.map((item, itemIndex) => (
                  <tr key={itemIndex}>
                    {itemIndex === 0 ? (
                      <td rowSpan={result.results.length} style={{ color: "black" }}>
                        {result.fileName}
                      </td>
                    ) : null}
                    <td>{item.sentence}</td>
                  </tr>
                ))
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ResultsTable;
