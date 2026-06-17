import React from "react";
import GSTForm from "../components/GSTForm";
import ResultCard from "../components/ResultCard";
import GSTBreakdown from "../components/GSTBreakdown";
import HistoryTable from "../components/HistoryTable";
import { formatIndianCurrency } from "../utils/gstCalculations";

/**
 * Home — the main page that composes all calculator components
 * Receives all state and handlers from the custom hook via props
 */
const Home = ({
  mode,
  amount,
  selectedRate,
  customRate,
  result,
  errors,
  copied,
  history,
  showComparison,
  comparisonData,
  onModeChange,
  onAmountChange,
  onRateChange,
  onCustomRateChange,
  onCalculate,
  onReset,
  onCopy,
  onToggleComparison,
  onClearHistory,
  onRestoreHistory,
  onDownloadPDF,
}) => {
  return (
    <main className="main-content">
      <div className="calculator-grid">
        {/* Left: Input form */}
        <section className="grid-left">
          <GSTForm
            mode={mode}
            amount={amount}
            selectedRate={selectedRate}
            customRate={customRate}
            errors={errors}
            onModeChange={onModeChange}
            onAmountChange={onAmountChange}
            onRateChange={onRateChange}
            onCustomRateChange={onCustomRateChange}
            onCalculate={onCalculate}
            onReset={onReset}
            onToggleComparison={onToggleComparison}
            showComparison={showComparison}
          />

          {/* GST Rate Comparison Table (conditional) */}
          {showComparison && comparisonData.length > 0 && (
            <div className="card comparison-card">
              <h3 className="card-title">Rate Comparison</h3>
              <p className="comparison-subtitle">
                GST on {formatIndianCurrency(parseFloat(amount))} across all standard rates
              </p>
              <div className="comparison-table-wrap">
                <table className="comparison-table" aria-label="GST rate comparison">
                  <thead>
                    <tr>
                      <th>Rate</th>
                      <th>GST Amount</th>
                      <th>{mode === "add" ? "Final Amount" : "Base Amount"}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonData.map((row) => {
                      const gst = row.gstAmount ?? row.gstPortion;
                      const final = row.finalAmount ?? row.baseAmount;
                      return (
                        <tr
                          key={row.rate}
                          className={
                            String(row.rate) === String(mode === "custom" ? customRate : selectedRate)
                              ? "comparison-row--active"
                              : ""
                          }
                        >
                          <td>
                            <span className="comparison-rate-badge">{row.rate}%</span>
                          </td>
                          <td>{formatIndianCurrency(gst)}</td>
                          <td>{formatIndianCurrency(final)}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </section>

        {/* Right: Results */}
        <section className="grid-right">
          <ResultCard
            result={result}
            mode={mode}
            onCopy={onCopy}
            copied={copied}
            onDownloadPDF={onDownloadPDF}
          />
          <GSTBreakdown result={result} />
        </section>
      </div>

      {/* History table (full width) */}
      <section className="history-section">
        <HistoryTable
          history={history}
          onRestore={onRestoreHistory}
          onClear={onClearHistory}
        />
      </section>
    </main>
  );
};

export default Home;
