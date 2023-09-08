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
            <tr key={index}>
              <td>{result.documentName}</td>
              <td>
                {result.sentenceWithHighlight} {/* Use CSS for highlighting */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ResultsTable;
