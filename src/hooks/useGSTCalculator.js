import { useState, useCallback, useEffect } from "react";
import {
  addGST,
  removeGST,
  validateInputs,
  formatResultForCopy,
  generateRateComparison,
} from "../utils/gstCalculations";

const HISTORY_KEY = "gst_calculator_history";
const MAX_HISTORY = 20;

/**
 * Central custom hook for GST Calculator state management
 */
export const useGSTCalculator = () => {
  const [mode, setMode] = useState("add"); // 'add' | 'remove'
  const [amount, setAmount] = useState("");
  const [selectedRate, setSelectedRate] = useState("18");
  const [customRate, setCustomRate] = useState("");
  const [result, setResult] = useState(null);
  const [errors, setErrors] = useState({});
  const [copied, setCopied] = useState(false);
  const [history, setHistory] = useState([]);
  const [showComparison, setShowComparison] = useState(false);
  const [comparisonData, setComparisonData] = useState([]);

  // Load history from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(HISTORY_KEY);
      if (saved) setHistory(JSON.parse(saved));
    } catch {
      // Ignore parse errors
    }
  }, []);

  // Persist history to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
    } catch {
      // Ignore storage errors
    }
  }, [history]);

  // Active GST rate (either selected or custom)
  const activeRate =
    selectedRate === "custom" ? customRate : selectedRate;

  /**
   * Run calculation in real-time whenever inputs change
   */
  useEffect(() => {
    if (!amount || !activeRate) {
      setResult(null);
      setComparisonData([]);
      return;
    }

    const { isValid } = validateInputs(amount, activeRate);
    if (!isValid) {
      setResult(null);
      return;
    }

    const calc =
      mode === "add"
        ? addGST(amount, activeRate)
        : removeGST(amount, activeRate);

    setResult(calc);

    if (showComparison) {
      setComparisonData(generateRateComparison(amount, mode));
    }
  }, [amount, activeRate, mode, showComparison]);

  /**
   * Handle form submission with validation
   */
  const handleCalculate = useCallback(() => {
    const { isValid, errors: validationErrors } = validateInputs(
      amount,
      activeRate
    );
    setErrors(validationErrors);

    if (!isValid) return;

    const calc =
      mode === "add"
        ? addGST(amount, activeRate)
        : removeGST(amount, activeRate);

    setResult(calc);

    // Save to history
    const entry = {
      id: Date.now(),
      mode,
      amount: parseFloat(amount),
      rate: parseFloat(activeRate),
      result: calc,
      timestamp: new Date().toLocaleString("en-IN"),
    };

    setHistory((prev) => [entry, ...prev].slice(0, MAX_HISTORY));
  }, [amount, activeRate, mode]);

  /**
   * Reset all fields
   */
  const handleReset = useCallback(() => {
    setAmount("");
    setSelectedRate("18");
    setCustomRate("");
    setResult(null);
    setErrors({});
    setCopied(false);
    setShowComparison(false);
    setComparisonData([]);
  }, []);

  /**
   * Copy results to clipboard
   */
  const handleCopy = useCallback(async () => {
    if (!result) return;
    const text = formatResultForCopy(result, mode);
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback for older browsers
      const el = document.createElement("textarea");
      el.value = text;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  }, [result, mode]);

  /**
   * Toggle rate comparison table
   */
  const handleToggleComparison = useCallback(() => {
    setShowComparison((prev) => {
      if (!prev && amount && activeRate) {
        setComparisonData(generateRateComparison(amount, mode));
      }
      return !prev;
    });
  }, [amount, activeRate, mode]);

  /**
   * Clear history
   */
  const handleClearHistory = useCallback(() => {
    setHistory([]);
    localStorage.removeItem(HISTORY_KEY);
  }, []);

  /**
   * Restore a history entry
   */
  const handleRestoreHistory = useCallback((entry) => {
    setMode(entry.mode);
    setAmount(String(entry.amount));
    const stdRates = ["3", "5", "12", "18", "28"];
    const rateStr = String(entry.rate);
    if (stdRates.includes(rateStr)) {
      setSelectedRate(rateStr);
      setCustomRate("");
    } else {
      setSelectedRate("custom");
      setCustomRate(rateStr);
    }
    setResult(entry.result);
    setErrors({});
  }, []);

  return {
    // State
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
    activeRate,
    // Setters
    setMode,
    setAmount,
    setSelectedRate,
    setCustomRate,
    setErrors,
    // Handlers
    handleCalculate,
    handleReset,
    handleCopy,
    handleToggleComparison,
    handleClearHistory,
    handleRestoreHistory,
  };
};
