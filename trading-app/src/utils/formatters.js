export const formatCurrency = (amount, currency = '₹') => {
  return `${currency}${amount.toLocaleString()}`;
};

export const formatPercentage = (percentage, showSign = true) => {
  const sign = showSign && percentage >= 0 ? '+' : '';
  return `${sign}${percentage.toFixed(2)}%`;
};

export const formatNumber = (number, decimals = 2) => {
  return number.toFixed(decimals);
};

export const formatDate = (timestamp) => {
  return new Date(timestamp).toLocaleDateString();
};

export const formatTime = (timestamp) => {
  return new Date(timestamp).toLocaleTimeString();
};