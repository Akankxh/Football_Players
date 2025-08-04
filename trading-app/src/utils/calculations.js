export const calculatePnL = (currentPrice, amountInvested, unitsLeft) => {
  if (!currentPrice || amountInvested <= 0) return 0;
  return ((currentPrice * unitsLeft) - amountInvested) / amountInvested * 100;
};

export const calculatePortfolioValue = (stocks, currentPrices) => {
  return stocks.reduce((total, stock) => {
    const currentPrice = currentPrices[stock.stockTicker] || 0;
    return total + (currentPrice * stock.unitsLeft);
  }, 0);
};

export const calculateTotalInvested = (stocks) => {
  return stocks.reduce((total, stock) => total + stock.amountInvested, 0);
};

export const calculateTotalPnL = (totalPortfolioValue, totalInvested) => {
  return totalInvested > 0 ? ((totalPortfolioValue - totalInvested) / totalInvested) * 100 : 0;
};