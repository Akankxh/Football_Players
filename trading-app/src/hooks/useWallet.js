import { useState, useEffect, useCallback } from 'react';
import { api } from '../services/api';

export const useWallet = () => {
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchBalance = useCallback(async () => {
    try {
      setLoading(true);
      const walletBalance = await api.getWalletBalance();
      console.log('Fetched wallet balance:', walletBalance);
      setBalance(walletBalance);
    } catch (error) {
      console.error('Error fetching wallet balance:', error);
      // Set a default balance if there's an error
      setBalance(0);
    } finally {
      setLoading(false);
    }
  }, []);

  const rechargeWallet = useCallback(async (amount) => {
    try {
      console.log('Attempting to recharge wallet with amount:', amount);
      const response = await api.rechargeWallet(amount);
      console.log('Recharge response:', response);
      
      // Update balance immediately with the new balance from response
      if (response && response.newBalance !== undefined) {
        setBalance(response.newBalance);
      } else {
        // Fallback: fetch the latest balance
        await fetchBalance();
      }
      
      return response;
    } catch (error) {
      console.error('Error recharging wallet:', error);
      throw error;
    }
  }, [fetchBalance]);

  useEffect(() => {
    fetchBalance();
  }, [fetchBalance]);

  return {
    balance,
    loading,
    rechargeWallet,
    refreshBalance: fetchBalance
  };
};