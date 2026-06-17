import React from "react";
import { formatIndianCurrency } from "../utils/gstCalculations";

const HistoryTable = ({ history, onRestore, onClear }) => {
  if (!history || history.length === 0) {
    return (
      <div className="card history-card">
        <h3 className="card-title">Calculation History</h3>
        <p className="history-empty">No calculations yet. Your history will appear here.</p>
      </div>
    );
  }

  return (
    <div className="card history-card">
      <div className="history-header">
        <h3 className="card-title">Calculation History</h3>
        <button
          className="btn btn-ghost btn-sm"
          onClick={onClear}
          aria-label="Clear all history"
        >
          🗑 Clear All
        </button>
      </div>

      <div className="history-table-wrap">
        <table className="history-table" aria-label="Calculation history">
          <thead>
            <tr>
              <th>Time</th>
              <th>Mode</th>
              <th>Amount</th>
              <th>Rate</th>
              <th>GST</th>
              <th>Result</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {history.map((entry) => {
              const gst = entry.result.gstAmount ?? entry.result.gstPortion;
              const final = entry.result.finalAmount ?? entry.result.baseAmount;
              return (
                <tr key={entry.id} className="history-row">
                  <td className="history-time">{entry.timestamp}</td>
                  <td>
                    <span className={`history-badge ${entry.mode === "add" ? "badge-add" : "badge-remove"}`}>
                      {entry.mode === "add" ? "Add" : "Remove"}
                    </span>
                  </td>
                  <td>{formatIndianCurrency(entry.amount)}</td>
                  <td>{entry.rate}%</td>
                  <td>{formatIndianCurrency(gst)}</td>
                  <td className="history-result">{formatIndianCurrency(final)}</td>
                  <td>
                    <button
                      className="btn btn-ghost btn-sm"
                      onClick={() => onRestore(entry)}
                      aria-label="Restore this calculation"
                      title="Restore"
                    >
                      ↩
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HistoryTable;
