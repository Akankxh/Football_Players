const API_BASE_URL = 'http://localhost:8080/api';

class ApiService {
  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      // Handle different response types
      const contentType = response.headers.get('content-type');
      let data;
      
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        data = await response.text();
      }

      if (!response.ok) {
        // If it's a JSON error response, throw the error message
        if (data && data.error) {
          throw new Error(data.error);
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return data;
    } catch (error) {
      console.error(`API request failed: ${endpoint}`, error);
      throw error;
    }
  }

  // Stock endpoints
  getAllStocks = () => this.request('/stocks/');
  getWatchlist = () => this.request('/stocks/watchlist');
  getBoughtStocks = () => this.request('/stocks/bought');
  getWalletBalance = () => this.request('/stocks/wallet');
  getCurrentPrice = (symbol) => this.request(`/stocks/current-price/${symbol}`);
  getChartData = (symbol, period = '1d') => this.request(`/stocks/chart/${symbol}?period=${period}`);
  
  // Updated recharge method to handle response properly
  rechargeWallet = async (amount) => {
    const response = await this.request(`/stocks/recharge?amount=${amount}`, { method: 'POST' });
    return response;
  };
  
  // Updated buy/sell methods to handle responses
  buyStock = async (ticker, units) => {
    const response = await this.request(`/stocks/buy?ticker=${ticker}&units=${units}`, { method: 'POST' });
    return response;
  };
  
  sellStock = async (ticker, units) => {
    const response = await this.request(`/stocks/sell?ticker=${ticker}&units=${units}`, { method: 'POST' });
    return response;
  };
  
  // Order endpoints
  getOrderHistory = () => this.request('/orders/history');
}

export const api = new ApiService();