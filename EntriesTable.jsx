
import React from 'react'

export default function EntriesTable({ rows }) {
  const headers = ['Type','Company','EntryDate','Hours','Rate','Income','Travelling','Rent','Mobile','Shopping','Credit','Other','Currency']
  return (
    <div style={{overflowX:'auto'}}>
      <table className="table">
        <thead>
          <tr>{headers.map(h => <th key={h}>{h}</th>)}</tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr><td colSpan={headers.length} style={{textAlign:'center', opacity:.7}}>No data loaded yet.</td></tr>
          ) : rows.map((r, i) => (
            <tr key={i}>
              {r.map((c, j) => <td key={j}>{String(c ?? '')}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
