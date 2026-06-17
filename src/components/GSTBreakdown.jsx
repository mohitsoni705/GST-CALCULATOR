import React, { useState } from "react";
import { formatIndianCurrency } from "../utils/gstCalculations";

const GSTBreakdown = ({ result }) => {
  const [taxType, setTaxType] = useState("intra"); // 'intra' | 'inter'

  if (!result) return null;

  const gstAmount = result.gstAmount ?? result.gstPortion;
  const rate = result.rate;

  return (
    <div className="card breakdown-card">
      <h3 className="card-title">GST Breakdown</h3>

      <div className="breakdown-toggle" role="group" aria-label="Tax type">
        <button
          className={`breakdown-btn ${taxType === "intra" ? "breakdown-btn--active" : ""}`}
          onClick={() => setTaxType("intra")}
          aria-pressed={taxType === "intra"}
        >
          Intra-state (CGST + SGST)
        </button>
        <button
          className={`breakdown-btn ${taxType === "inter" ? "breakdown-btn--active" : ""}`}
          onClick={() => setTaxType("inter")}
          aria-pressed={taxType === "inter"}
        >
          Inter-state (IGST)
        </button>
      </div>

      {taxType === "intra" ? (
        <div className="breakdown-rows">
          <div className="breakdown-row">
            <div className="breakdown-info">
              <span className="breakdown-label">CGST</span>
              <span className="breakdown-rate">{rate / 2}%</span>
            </div>
            <span className="breakdown-value">{formatIndianCurrency(result.cgst)}</span>
          </div>
          <div className="breakdown-divider" />
          <div className="breakdown-row">
            <div className="breakdown-info">
              <span className="breakdown-label">SGST</span>
              <span className="breakdown-rate">{rate / 2}%</span>
            </div>
            <span className="breakdown-value">{formatIndianCurrency(result.sgst)}</span>
          </div>
          <div className="breakdown-divider" />
          <div className="breakdown-row breakdown-row--total">
            <span className="breakdown-label">Total GST</span>
            <span className="breakdown-value">{formatIndianCurrency(gstAmount)}</span>
          </div>
        </div>
      ) : (
        <div className="breakdown-rows">
          <div className="breakdown-row">
            <div className="breakdown-info">
              <span className="breakdown-label">IGST</span>
              <span className="breakdown-rate">{rate}%</span>
            </div>
            <span className="breakdown-value">{formatIndianCurrency(result.igst)}</span>
          </div>
          <div className="breakdown-divider" />
          <div className="breakdown-row breakdown-row--total">
            <span className="breakdown-label">Total GST</span>
            <span className="breakdown-value">{formatIndianCurrency(gstAmount)}</span>
          </div>
        </div>
      )}

      <p className="breakdown-note">
        CGST &amp; SGST apply to intra-state transactions; IGST applies to inter-state transactions.
      </p>
    </div>
  );
};

export default GSTBreakdown;
