export const formatIndianCurrency = (amount) => {
  if (isNaN(amount) || amount === null || amount === undefined) return "0.00";
  const fixed = parseFloat(amount).toFixed(2);
  const [integer, decimal] = fixed.split(".");
  const lastThree = integer.slice(-3);
  const otherDigits = integer.slice(0, -3);
  const formatted =
    otherDigits !== ""
      ? otherDigits.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + "," + lastThree
      : lastThree;
  return `₹${formatted}.${decimal}`;
};

export const addGST = (amount, rate) => {
  const originalAmount = parseFloat(amount);
  const gstRate = parseFloat(rate);

  if (isNaN(originalAmount) || isNaN(gstRate)) return null;

  const gstAmount = (originalAmount * gstRate) / 100;
  const finalAmount = originalAmount + gstAmount;

  const cgst = gstAmount / 2;
  const sgst = gstAmount / 2;
  const igst = gstAmount;

  return {
    originalAmount,
    gstAmount,
    finalAmount,
    cgst,
    sgst,
    igst,
    rate: gstRate,
  };
};

export const removeGST = (totalAmount, rate) => {
  const total = parseFloat(totalAmount);
  const gstRate = parseFloat(rate);

  if (isNaN(total) || isNaN(gstRate)) return null;

  const baseAmount = total / (1 + gstRate / 100);
  const gstPortion = total - baseAmount;

  const cgst = gstPortion / 2;
  const sgst = gstPortion / 2;
  const igst = gstPortion;

  return {
    totalAmount: total,
    gstPortion,
    baseAmount,
    cgst,
    sgst,
    igst,
    rate: gstRate,
  };
};

export const validateInputs = (amount, rate) => {
  const errors = {};

  if (!amount || amount === "") {
    errors.amount = "Amount is required.";
  } else if (isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
    errors.amount = "Enter a valid positive amount.";
  } else if (parseFloat(amount) > 99999999) {
    errors.amount = "Amount cannot exceed ₹9,99,99,999.";
  }

  if (!rate || rate === "") {
    errors.rate = "GST rate is required.";
  } else if (isNaN(parseFloat(rate)) || parseFloat(rate) < 0) {
    errors.rate = "Enter a valid GST rate.";
  } else if (parseFloat(rate) > 100) {
    errors.rate = "GST rate cannot exceed 100%.";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

export const formatResultForCopy = (result, mode) => {
  if (!result) return "";

  if (mode === "add") {
    return `GST Calculation (Add GST @ ${result.rate}%)
Original Amount: ${formatIndianCurrency(result.originalAmount)}
GST Amount: ${formatIndianCurrency(result.gstAmount)}
Final Amount: ${formatIndianCurrency(result.finalAmount)}
---
CGST (${result.rate / 2}%): ${formatIndianCurrency(result.cgst)}
SGST (${result.rate / 2}%): ${formatIndianCurrency(result.sgst)}
IGST (${result.rate}%): ${formatIndianCurrency(result.igst)}`;
  } else {
    return `GST Calculation (Remove GST @ ${result.rate}%)
Total Amount: ${formatIndianCurrency(result.totalAmount)}
GST Portion: ${formatIndianCurrency(result.gstPortion)}
Base Amount: ${formatIndianCurrency(result.baseAmount)}
---
CGST (${result.rate / 2}%): ${formatIndianCurrency(result.cgst)}
SGST (${result.rate / 2}%): ${formatIndianCurrency(result.sgst)}
IGST (${result.rate}%): ${formatIndianCurrency(result.igst)}`;
  }
};

export const GST_RATES = [
  { label: "3% — Essential goods", value: "3" },
  { label: "5% — Basic necessities", value: "5" },
  { label: "12% — Standard goods", value: "12" },
  { label: "18% — Most services", value: "18" },
  { label: "28% — Luxury items", value: "28" },
  { label: "Custom Rate", value: "custom" },
];

export const generateRateComparison = (amount, mode) => {
  const standardRates = [3, 5, 12, 18, 28];
  return standardRates.map((rate) => {
    const result =
      mode === "add" ? addGST(amount, rate) : removeGST(amount, rate);
    return { rate, ...result };
  });
};
