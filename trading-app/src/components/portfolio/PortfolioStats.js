// src/components/portfolio/PortfolioStats.js
import React from 'react';
import { DollarSign, TrendingUp, TrendingDown } from 'lucide-react';
import WalletCard from './WalletCard';
import Card from '../common/Card';
import { calculatePortfolioValue, calculateTotalInvested, calculateTotalPnL } from '../../utils/calculations';
import { formatCurrency, formatPercentage } from '../../utils/formatters';

const PortfolioStats = ({ balance, stocks, currentPrices, onRecharge, loading }) => {
  const totalPortfolioValue = calculatePortfolioValue(stocks, currentPrices);
  const totalInvested = calculateTotalInvested(stocks);
  const totalPnL = calculateTotalPnL(totalPortfolioValue, totalInvested);

  const StatCard = ({ title, value, icon: Icon, color, isLoading }) => (
    <Card>
      <div className="flex items-center space-x-2 mb-2">
        <Icon size={20} className={`text-${color}-600`} />
        <h3 className="font-semibold text-gray-900 dark:text-white">{title}</h3>
      </div>
      <div className="text-2xl font-bold text-gray-900 dark:text-white">
        {isLoading ? (
          <div className="w-24 h-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
        ) : (
          value
        )}
      </div>
    </Card>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <WalletCard 
        balance={balance} 
        onRecharge={onRecharge}
        isLoading={loading.wallet}
      />
      
      <StatCard
        title="Portfolio Value"
        value={formatCurrency(totalPortfolioValue)}
        icon={DollarSign}
        color="green"
        isLoading={loading.stocks}
      />
      
      <StatCard
        title="Total Invested"
        value={formatCurrency(totalInvested)}
        icon={TrendingUp}
        color="blue"
        isLoading={loading.stocks}
      />
      
      <Card>
        <div className="flex items-center space-x-2 mb-2">
          {totalPnL >= 0 ? (
            <TrendingUp size={20} className="text-green-600" />
          ) : (
            <TrendingDown size={20} className="text-red-600" />
          )}
          <h3 className="font-semibold text-gray-900 dark:text-white">P&L</h3>
        </div>
        <div className={`text-2xl font-bold ${totalPnL >= 0 ? 'text-green-600' : 'text-red-600'}`}>
          {loading.stocks ? (
            <div className="w-20 h-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
          ) : (
            formatPercentage(totalPnL)
          )}
        </div>
      </Card>
    </div>
  );
};

export default PortfolioStats;