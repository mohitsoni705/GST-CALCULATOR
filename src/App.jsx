import React, { useState, useCallback } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import { useGSTCalculator } from "./hooks/useGSTCalculator";
import "./styles/global.css";

function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("gst_theme") || "light";
  });

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next = prev === "light" ? "dark" : "light";
      localStorage.setItem("gst_theme", next);
      return next;
    });
  }, []);

  const {
    mode, amount, selectedRate, customRate, result, errors,
    copied, history, showComparison, comparisonData,
    setMode, setAmount, setSelectedRate, setCustomRate,
    handleCalculate, handleReset, handleCopy, handleToggleComparison,
    handleClearHistory, handleRestoreHistory,
  } = useGSTCalculator();

  const handleDownloadPDF = useCallback(() => {
    if (!result) return;
    window.print();
  }, [result]);

  return (
    <div className="app" data-theme={theme}>
      <Header theme={theme} onThemeToggle={toggleTheme} />
      <Home
        mode={mode}
        amount={amount}
        selectedRate={selectedRate}
        customRate={customRate}
        result={result}
        errors={errors}
        copied={copied}
        history={history}
        showComparison={showComparison}
        comparisonData={comparisonData}
        onModeChange={setMode}
        onAmountChange={setAmount}
        onRateChange={setSelectedRate}
        onCustomRateChange={setCustomRate}
        onCalculate={handleCalculate}
        onReset={handleReset}
        onCopy={handleCopy}
        onToggleComparison={handleToggleComparison}
        onClearHistory={handleClearHistory}
        onRestoreHistory={handleRestoreHistory}
        onDownloadPDF={handleDownloadPDF}
      />
      <Footer />
    </div>
  );
}

export default App;
