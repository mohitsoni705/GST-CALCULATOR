import React from "react";
import { GST_RATES } from "../utils/gstCalculations";

const RateSelector = ({
  selectedRate,
  customRate,
  onRateChange,
  onCustomRateChange,
  error,
}) => {
  return (
    <div className="form-group">
      <label className="form-label" htmlFor="gst-rate">
        GST Rate
      </label>
      <select
        id="gst-rate"
        className={`form-select ${error ? "input-error" : ""}`}
        value={selectedRate}
        onChange={(e) => onRateChange(e.target.value)}
      >
        {GST_RATES.map((r) => (
          <option key={r.value} value={r.value}>
            {r.label}
          </option>
        ))}
      </select>

      {selectedRate === "custom" && (
        <div className="custom-rate-wrap">
          <input
            type="number"
            className={`form-input custom-rate-input ${error ? "input-error" : ""}`}
            placeholder="Enter custom rate (e.g. 7.5)"
            value={customRate}
            onChange={(e) => onCustomRateChange(e.target.value)}
            min="0"
            max="100"
            step="0.01"
            aria-label="Custom GST rate"
          />
          <span className="rate-suffix">%</span>
        </div>
      )}

      {error && <p className="error-text">{error}</p>}
    </div>
  );
};

export default RateSelector;
