import React from "react";
import { formatIndianCurrency } from "../utils/gstCalculations";

const ResultCard = ({ result, mode, onCopy, copied, onDownloadPDF }) => {
  if (!result) {
    return (
      <div className="card result-card result-card--empty">
        <div className="empty-state">
          <span className="empty-icon">🧮</span>
          <p>Enter an amount and select a GST rate to see your calculation.</p>
        </div>
      </div>
    );
  }

  const rows =
    mode === "add"
      ? [
          { label: "Original Amount", value: result.originalAmount, accent: false },
          { label: `GST Amount (${result.rate}%)`, value: result.gstAmount, accent: false, highlight: true },
          { label: "Final Amount", value: result.finalAmount, accent: true },
        ]
      : [
          { label: "Total Amount (incl. GST)", value: result.totalAmount, accent: false },
          { label: `GST Portion (${result.rate}%)`, value: result.gstPortion, accent: false, highlight: true },
          { label: "Base Amount (excl. GST)", value: result.baseAmount, accent: true },
        ];

  return (
    <div className="card result-card">
      <div className="result-header">
        <h2 className="card-title">
          {mode === "add" ? "GST Added" : "GST Removed"} @ {result.rate}%
        </h2>
        <div className="result-actions">
          <button
            className={`btn btn-icon ${copied ? "btn-success" : "btn-ghost"}`}
            onClick={onCopy}
            title="Copy results"
            aria-label="Copy results to clipboard"
          >
            {copied ? "✅ Copied!" : "📋 Copy"}
          </button>
          <button
            className="btn btn-icon btn-ghost"
            onClick={onDownloadPDF}
            title="Download as PDF"
            aria-label="Download result as PDF"
          >
            ⬇️ PDF
          </button>
        </div>
      </div>

      <div className="result-rows">
        {rows.map((row, i) => (
          <div
            key={i}
            className={`result-row ${row.accent ? "result-row--accent" : ""} ${row.highlight ? "result-row--highlight" : ""}`}
          >
            <span className="result-label">{row.label}</span>
            <span className="result-value">{formatIndianCurrency(row.value)}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResultCard;
