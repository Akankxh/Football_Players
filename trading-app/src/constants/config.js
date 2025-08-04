export const API_CONFIG = {
  BASE_URL: 'http://localhost:8080/api',
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3
};

export const REFRESH_INTERVALS = {
  PRICES: 30000,        // 30 seconds
  PORTFOLIO: 60000,     // 1 minute
  ORDERS: 30000         // 30 seconds
};

export const CHART_PERIODS = [
  { value: '1d', label: '1 Day' },
  { value: '1w', label: '1 Week' },
  { value: '1m', label: '1 Month' },
  { value: '1y', label: '1 Year' },
  { value: '5y', label: '5 Years' }
];

export const STOCK_ACTIONS = {
  BUY: 'buy',
  SELL: 'sell'
};