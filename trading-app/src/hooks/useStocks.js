import { useState, useEffect, useCallback } from 'react';
import { api } from '../services/api';

export const useStocks = () => {
  const [stocks, setStocks] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchStocks = useCallback(async () => {
    try {
      setLoading(true);
      const [boughtStocks, watchlistData, ordersData] = await Promise.all([
        api.getBoughtStocks(),
        api.getWatchlist(),
        api.getOrderHistory()
      ]);
      
      setStocks(boughtStocks);
      setWatchlist(watchlistData);
      setOrders(ordersData);
    } catch (error) {
      console.error('Error fetching stocks:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const buyStock = useCallback(async (ticker, units) => {
    try {
      await api.buyStock(ticker, units);
      await fetchStocks();
    } catch (error) {
      console.error('Error buying stock:', error);
      throw error;
    }
  }, [fetchStocks]);

  const sellStock = useCallback(async (ticker, units) => {
    try {
      await api.sellStock(ticker, units);
      await fetchStocks();
    } catch (error) {
      console.error('Error selling stock:', error);
      throw error;
    }
  }, [fetchStocks]);

  useEffect(() => {
    fetchStocks();
  }, [fetchStocks]);

  return {
    stocks,
    watchlist,
    orders,
    loading,
    buyStock,
    sellStock,
    refreshStocks: fetchStocks
  };
};