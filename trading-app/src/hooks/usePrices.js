import { useState, useEffect, useCallback } from 'react';
import { api } from '../services/api';

export const usePrices = (stocks = [], watchlist = []) => {
  const [prices, setPrices] = useState([]);
  const [currentPrices, setCurrentPrices] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchMarqueePrices = useCallback(async () => {
    try {
      const symbols = ['AAPL', 'GOOGL', 'MSFT', 'TSLA'];
      const pricePromises = symbols.map(async (symbol) => {
        try {
          const price = await api.getCurrentPrice(symbol);
          return {
            symbol,
            price: price.toFixed(2),
            change: (Math.random() - 0.5) * 4
          };
        } catch (error) {
          return {
            symbol,
            price: (Math.random() * 200).toFixed(2),
            change: (Math.random() - 0.5) * 4
          };
        }
      });
      
      const pricesData = await Promise.all(pricePromises);
      setPrices(pricesData);
    } catch (error) {
      console.error('Error fetching marquee prices:', error);
    }
  }, []);

  const fetchCurrentPrices = useCallback(async () => {
    try {
      setLoading(true);
      const allSymbols = [...new Set([
        ...stocks.map(s => s.stockTicker),
        ...watchlist.map(w => w.stockTicker)
      ])];
      
      if (allSymbols.length === 0) {
        setLoading(false);
        return;
      }

      const pricePromises = allSymbols.map(async (symbol) => {
        try {
          const price = await api.getCurrentPrice(symbol);
          return { symbol, price };
        } catch (error) {
          return { symbol, price: Math.random() * 200 };
        }
      });
      
      const pricesData = await Promise.all(pricePromises);
      const pricesMap = {};
      pricesData.forEach(({ symbol, price }) => {
        pricesMap[symbol] = price;
      });
      setCurrentPrices(pricesMap);
    } catch (error) {
      console.error('Error fetching current prices:', error);
    } finally {
      setLoading(false);
    }
  }, [stocks, watchlist]);

  useEffect(() => {
    fetchMarqueePrices();
    fetchCurrentPrices();

    const interval = setInterval(() => {
      fetchMarqueePrices();
      fetchCurrentPrices();
    }, 30000);

    return () => clearInterval(interval);
  }, [fetchMarqueePrices, fetchCurrentPrices]);

  return {
    prices,
    currentPrices,
    loading
  };
};