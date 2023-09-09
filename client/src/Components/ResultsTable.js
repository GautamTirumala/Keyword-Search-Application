import React from 'react';

function ResultsTable({ results }) {
  console.log(results)
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
              <td style={{color:"black"}}>{result.fileName} </td>
              <td>
              {Array.isArray(result.results) ? (
                  <ul>
                    {result.results.map((item, itemIndex) => (
                      <li key={itemIndex}>{item.rowData.__EMPTY}</li>
                    ))}
                  </ul>
                ) : (
                  result.results
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default ResultsTable;
