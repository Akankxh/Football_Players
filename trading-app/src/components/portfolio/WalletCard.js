// src/components/portfolio/WalletCard.js
import React, { useState } from 'react';
import { Wallet, Plus, CheckCircle, XCircle } from 'lucide-react';
import Card from '../common/Card';
import Button from '../common/Button';
import { formatCurrency } from '../../utils/formatters';

const WalletCard = ({ balance, onRecharge, isLoading }) => {
  const [rechargeAmount, setRechargeAmount] = useState('');
  const [showRecharge, setShowRecharge] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleRecharge = async () => {
    if (!rechargeAmount || parseFloat(rechargeAmount) <= 0) {
      setError('Please enter a valid amount greater than 0');
      return;
    }

    try {
      setLoading(true);
      setError('');
      setSuccess('');
      
      console.log('Recharging with amount:', parseFloat(rechargeAmount));
      const response = await onRecharge(parseFloat(rechargeAmount));
      console.log('Recharge successful:', response);
      
      setSuccess(`Successfully recharged ₹${rechargeAmount}`);
      setRechargeAmount('');
      setShowRecharge(false);
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      console.error('Recharge failed:', error);
      setError(error.message || 'Failed to recharge wallet. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setShowRecharge(false);
    setRechargeAmount('');
    setError('');
    setSuccess('');
  };

  const handleAmountChange = (e) => {
    setRechargeAmount(e.target.value);
    // Clear error when user starts typing
    if (error) setError('');
  };

  return (
    <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-6 rounded-xl shadow-lg text-white relative">
      {/* Success/Error Messages */}
      {success && (
        <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded text-xs flex items-center">
          <CheckCircle size={12} className="mr-1" />
          Success
        </div>
      )}
      {error && (
        <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs flex items-center">
          <XCircle size={12} className="mr-1" />
          Error
        </div>
      )}

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Wallet size={24} />
          <h3 className="text-lg font-semibold">Wallet Balance</h3>
        </div>
        <button
          onClick={() => setShowRecharge(!showRecharge)}
          className="bg-white/20 hover:bg-white/30 p-2 rounded-lg transition-colors"
          disabled={loading}
        >
          <Plus size={16} />
        </button>
      </div>
      
      <div className="text-3xl font-bold mb-4">
        {isLoading ? (
          <div className="w-32 h-8 bg-white/20 rounded animate-pulse"></div>
        ) : (
          formatCurrency(balance)
        )}
      </div>
      
      {showRecharge && (
        <div className="space-y-3">
          <div>
            <input
              type="number"
              placeholder="Amount to recharge"
              value={rechargeAmount}
              onChange={handleAmountChange}
              className="w-full p-2 rounded bg-white/20 placeholder-white/70 text-white border-none focus:ring-2 focus:ring-white/50"
              disabled={loading}
              min="1"
              step="0.01"
            />
            {error && (
              <p className="text-red-200 text-xs mt-1">{error}</p>
            )}
          </div>
          
          <div className="flex space-x-2">
            <Button
              onClick={handleRecharge}
              loading={loading}
              className="flex-1 bg-white/20 hover:bg-white/30"
              disabled={!rechargeAmount || parseFloat(rechargeAmount) <= 0}
            >
              {loading ? 'Processing...' : 'Recharge Wallet'}
            </Button>
            <Button
              onClick={handleCancel}
              className="px-4 bg-white/10 hover:bg-white/20"
              disabled={loading}
            >
              Cancel
            </Button>
          </div>
          
          {rechargeAmount && parseFloat(rechargeAmount) > 0 && (
            <div className="text-xs text-white/80">
              You will add {formatCurrency(parseFloat(rechargeAmount))} to your wallet
            </div>
          )}
        </div>
      )}
      
      {success && (
        <div className="mt-2 text-green-200 text-sm">
          {success}
        </div>
      )}
    </div>
  );
};

export default WalletCard;