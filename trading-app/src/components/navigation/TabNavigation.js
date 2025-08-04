// src/components/navigation/TabNavigation.js
import React from 'react';
import { Briefcase, Eye, History } from 'lucide-react';
import Card from '../common/Card';
import StockCard from '../portfolio/StockCard';
import OrderHistory from '../trading/OrderHistory';
import { useStocks } from '../../hooks/useStocks';

const TabNavigation = ({ activeTab, onTabChange, stocks, watchlist, orders, currentPrices, loading }) => {
  const { buyStock, sellStock } = useStocks();

  const tabs = [
    { 
      id: 'portfolio', 
      label: 'Portfolio', 
      icon: Briefcase,
      count: stocks.length,
      color: 'text-blue-600'
    },
    { 
      id: 'watchlist', 
      label: 'Watchlist', 
      icon: Eye,
      count: watchlist.length,
      color: 'text-green-600'
    },
    { 
      id: 'orders', 
      label: 'Order History', 
      icon: History,
      count: orders.length,
      color: 'text-purple-600'
    }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'portfolio':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
              [1, 2, 3].map(i => (
                <div key={i} className="bg-gray-200 dark:bg-gray-700 p-4 rounded-xl animate-pulse h-80"></div>
              ))
            ) : stocks.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <Briefcase size={48} className="mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  No stocks in portfolio
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Start trading to see your portfolio here
                </p>
              </div>
            ) : (
              stocks.map(stock => (
                <StockCard
                  key={stock.stockTicker}
                  stock={stock}
                  onBuy={buyStock}
                  onSell={sellStock}
                  currentPrice={currentPrices[stock.stockTicker]}
                  isLoading={!currentPrices[stock.stockTicker] && currentPrices[stock.stockTicker] !== 0}
                />
              ))
            )}
          </div>
        );

      case 'watchlist':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
              [1, 2, 3].map(i => (
                <div key={i} className="bg-gray-200 dark:bg-gray-700 p-4 rounded-xl animate-pulse h-80"></div>
              ))
            ) : watchlist.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <Eye size={48} className="mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  No stocks in watchlist
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Add stocks to your watchlist to monitor them
                </p>
              </div>
            ) : (
              watchlist.map(stock => (
                <StockCard
                  key={stock.stockTicker}
                  stock={stock}
                  onBuy={buyStock}
                  onSell={sellStock}
                  currentPrice={currentPrices[stock.stockTicker]}
                  isLoading={!currentPrices[stock.stockTicker] && currentPrices[stock.stockTicker] !== 0}
                />
              ))
            )}
          </div>
        );

      case 'orders':
        return <OrderHistory orders={orders} isLoading={loading} />;

      default:
        return null;
    }
  };

  return (
    <Card className="mb-8">
      {/* Tab Navigation */}
      <div className="border-b dark:border-gray-700 mb-6">
        <nav className="flex space-x-8 px-2">
          {tabs.map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`py-4 px-2 border-b-2 font-medium text-sm flex items-center space-x-2 transition-colors ${
                  activeTab === tab.id
                    ? `border-blue-500 ${tab.color} dark:text-blue-400`
                    : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
                }`}
              >
                <Icon size={18} />
                <span>{tab.label}</span>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  activeTab === tab.id 
                    ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                    : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300'
                }`}>
                  {tab.count}
                </span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="min-h-[400px]">
        {renderTabContent()}
      </div>
    </Card>
  );
};

export default TabNavigation;