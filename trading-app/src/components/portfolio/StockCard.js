// src/components/portfolio/StockCard.js
import React, { useState } from 'react';
import { Plus, Minus, TrendingUp, TrendingDown } from 'lucide-react';
import Card from '../common/Card';
import Button from '../common/Button';
import { calculatePnL } from '../../utils/calculations';
import { formatCurrency, formatPercentage, formatNumber } from '../../utils/formatters';

const StockCard = ({ stock, onBuy, onSell, currentPrice, isLoading }) => {
  const [action, setAction] = useState(null);
  const [units, setUnits] = useState('');
  const [loading, setLoading] = useState(false);
  
  const pnl = calculatePnL(currentPrice, stock.amountInvested, stock.unitsLeft);
  const currentValue = currentPrice ? currentPrice * stock.unitsLeft : 0;

  const handleAction = async () => {
    if (units && parseFloat(units) > 0) {
      try {
        setLoading(true);
        if (action === 'buy') {
          await onBuy(stock.stockTicker, parseFloat(units));
        } else if (action === 'sell') {
          await onSell(stock.stockTicker, parseFloat(units));
        }
        setUnits('');
        setAction(null);
      } catch (error) {
        console.error(`Error ${action}ing stock:`, error);
        // You could add a toast notification here
      } finally {
        setLoading(false);
      }
    }
  };

  const handleCancel = () => {
    setAction(null);
    setUnits('');
  };

  return (
    <Card hover className="h-full">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h4 className="font-bold text-lg text-gray-900 dark:text-white">
            {stock.stockTicker}
          </h4>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {stock.stockName}
          </p>
        </div>
        <div className="text-right">
          {isLoading ? (
            <div className="w-16 h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
          ) : (
            <div className="text-lg font-bold text-gray-900 dark:text-white">
              {formatCurrency(currentPrice || 0)}
            </div>
          )}
          {pnl !== 0 && (
            <div className={`text-sm flex items-center ${
              pnl >= 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              {pnl >= 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
              <span className="ml-1">{formatPercentage(pnl)}</span>
            </div>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 text-sm mb-4">
        <div>
          <span className="text-gray-600 dark:text-gray-400 block">Holdings:</span>
          <div className="font-semibold text-gray-900 dark:text-white">
            {formatNumber(stock.unitsLeft)} units
          </div>
        </div>
        <div>
          <span className="text-gray-600 dark:text-gray-400 block">Invested:</span>
          <div className="font-semibold text-gray-900 dark:text-white">
            {formatCurrency(stock.amountInvested)}
          </div>
        </div>
        <div>
          <span className="text-gray-600 dark:text-gray-400 block">Current Value:</span>
          <div className="font-semibold text-gray-900 dark:text-white">
            {formatCurrency(currentValue)}
          </div>
        </div>
        <div>
          <span className="text-gray-600 dark:text-gray-400 block">Avg Price:</span>
          <div className="font-semibold text-gray-900 dark:text-white">
            {stock.unitsBought > 0 
              ? formatCurrency(stock.amountInvested / stock.unitsBought)
              : formatCurrency(0)
            }
          </div>
        </div>
      </div>
      
      {action ? (
        <div className="space-y-3">
          <input
            type="number"
            placeholder={`Enter units to ${action}`}
            value={units}
            onChange={(e) => setUnits(e.target.value)}
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500"
            disabled={loading}
            min="0"
            step="0.01"
          />
          <div className="flex space-x-2">
            <Button
              onClick={handleAction}
              loading={loading}
              variant={action === 'buy' ? 'success' : 'danger'}
              className="flex-1"
              disabled={!units || parseFloat(units) <= 0}
            >
              Confirm {action === 'buy' ? 'Buy' : 'Sell'}
            </Button>
            <Button
              onClick={handleCancel}
              variant="outline"
              className="px-4"
              disabled={loading}
            >
              Cancel
            </Button>
          </div>
          {action === 'buy' && units && currentPrice && (
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Total Cost: {formatCurrency(parseFloat(units) * currentPrice)}
            </div>
          )}
          {action === 'sell' && units && parseFloat(units) > stock.unitsLeft && (
            <div className="text-sm text-red-600">
              Cannot sell more than {formatNumber(stock.unitsLeft)} units
            </div>
          )}
        </div>
      ) : (
        <div className="flex space-x-2">
          <Button
            onClick={() => setAction('buy')}
            variant="success"
            className="flex-1 flex items-center justify-center space-x-1"
          >
            <Plus size={16} />
            <span>Buy</span>
          </Button>
          <Button
            onClick={() => setAction('sell')}
            variant="danger"
            className="flex-1 flex items-center justify-center space-x-1"
            disabled={stock.unitsLeft <= 0}
          >
            <Minus size={16} />
            <span>Sell</span>
          </Button>
        </div>
      )}
    </Card>
  );
};

export default StockCard;