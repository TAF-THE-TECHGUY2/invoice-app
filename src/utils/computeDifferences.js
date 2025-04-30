// src/components/computeDifferences.js

/**
 * Adds `difference` and `percentageChange` to each invoice object
 * by comparing `totalAmount` to the previous invoice's totalAmount.
 *
 * @param {Array} invoices - The raw invoice data (sorted by month).
 * @returns {Array} - A new array with `difference` and `percentageChange`.
 */
export function computeDifferences(invoices) {
  return invoices.map((inv, index, arr) => {
    if (index === 0) {
      // First entry has no "previous" month
      return {
        ...inv,
        difference: 0,
        percentageChange: 0
      };
    }

    const prevTotal = arr[index - 1].totalAmount || 0;
    const diff = inv.totalAmount - prevTotal;
    const pctChange = prevTotal === 0 ? 0 : (diff / prevTotal) * 100;

    return {
      ...inv,
      difference: diff,
      // Round to 2 decimals
      percentageChange: parseFloat(pctChange.toFixed(2))
    };
  });
}
