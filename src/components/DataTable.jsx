import React from 'react';

const DataTable = ({ data }) => (
  <table className="w-full border-collapse border border-gray-300">
    <thead>
      <tr>
        {Object.keys(data[0]).map((key) => (
          <th key={key} className="border border-gray-300 p-2">{key}</th>
        ))}
      </tr>
    </thead>
    <tbody>
      {data.map((row, index) => (
        <tr key={index}>
          {Object.values(row).map((value, i) => (
            <td key={i} className="border border-gray-300 p-2">{value}</td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
);
export default DataTable;
