import React from "react";
import RateSelector from "./RateSelector";

/**
 * GSTForm — collects user inputs for GST calculation
 */
const GSTForm = ({
  mode,
  amount,
  selectedRate,
  customRate,
  errors,
  onModeChange,
  onAmountChange,
  onRateChange,
  onCustomRateChange,
  onCalculate,
  onReset,
  onToggleComparison,
  showComparison,
}) => {
  // Allow Enter key to trigger calculation
  const handleKeyDown = (e) => {
    if (e.key === "Enter") onCalculate();
  };

  return (
    <div className="card form-card">
      <h2 className="card-title">Calculate GST</h2>

      {/* Mode toggle */}
      <div className="mode-toggle-group" role="group" aria-label="Calculation mode">
        <button
          className={`mode-btn ${mode === "add" ? "mode-btn--active" : ""}`}
          onClick={() => onModeChange("add")}
          aria-pressed={mode === "add"}
        >
          <span className="mode-icon">➕</span> Add GST
        </button>
        <button
          className={`mode-btn ${mode === "remove" ? "mode-btn--active" : ""}`}
          onClick={() => onModeChange("remove")}
          aria-pressed={mode === "remove"}
        >
          <span className="mode-icon">➖</span> Remove GST
        </button>
      </div>

      {/* Amount input */}
      <div className="form-group">
        <label className="form-label" htmlFor="amount">
          {mode === "add" ? "Base Amount (excl. GST)" : "Total Amount (incl. GST)"}
        </label>
        <div className="input-wrapper">
          <span className="input-prefix">₹</span>
          <input
            id="amount"
            type="number"
            className={`form-input amount-input ${errors.amount ? "input-error" : ""}`}
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => onAmountChange(e.target.value)}
            onKeyDown={handleKeyDown}
            min="0"
            step="0.01"
            aria-label="Amount"
            aria-describedby={errors.amount ? "amount-error" : undefined}
          />
        </div>
        {errors.amount && (
          <p id="amount-error" className="error-text" role="alert">
            {errors.amount}
          </p>
        )}
      </div>

      {/* Rate selector */}
      <RateSelector
        selectedRate={selectedRate}
        customRate={customRate}
        onRateChange={onRateChange}
        onCustomRateChange={onCustomRateChange}
        error={errors.rate}
      />

      {/* Action buttons */}
      <div className="form-actions">
        <button className="btn btn-primary" onClick={onCalculate}>
          Calculate
        </button>
        <button className="btn btn-secondary" onClick={onReset}>
          Reset
        </button>
      </div>

      {/* Comparison toggle */}
      <button
        className="comparison-toggle-btn"
        onClick={onToggleComparison}
      >
        {showComparison ? "▲ Hide" : "▼ Show"} Rate Comparison Table
      </button>
    </div>
  );
};

export default GSTForm;
