// src/components/trading/OrderHistory.js
import React from 'react';
import { Activity, TrendingUp, TrendingDown, Wallet } from 'lucide-react';
import Card from '../common/Card';
import { formatCurrency, formatNumber, formatDate, formatTime } from '../../utils/formatters';

const OrderHistory = ({ orders, isLoading }) => {
  const getActivityIcon = (activity) => {
    switch (activity?.toLowerCase()) {
      case 'bought':
        return <TrendingUp size={16} className="text-green-600" />;
      case 'sold':
        return <TrendingDown size={16} className="text-red-600" />;
      case 'recharge':
        return <Wallet size={16} className="text-blue-600" />;
      default:
        return <Activity size={16} className="text-gray-600" />;
    }
  };

  const getActivityColor = (activity) => {
    switch (activity?.toLowerCase()) {
      case 'bought':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'sold':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'recharge':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  };

  if (isLoading) {
    return (
      <Card>
        <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
          <Activity size={20} />
          <span>Recent Orders</span>
        </h3>
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className="flex justify-between items-center p-3 border dark:border-gray-700 rounded animate-pulse">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div>
                  <div className="w-20 h-4 bg-gray-200 dark:bg-gray-700 rounded mb-1"></div>
                  <div className="w-16 h-3 bg-gray-200 dark:bg-gray-700 rounded"></div>
                </div>
              </div>
              <div className="text-right">
                <div className="w-16 h-4 bg-gray-200 dark:bg-gray-700 rounded mb-1"></div>
                <div className="w-12 h-3 bg-gray-200 dark:bg-gray-700 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2 text-gray-900 dark:text-white">
        <Activity size={20} />
        <span>Recent Orders</span>
        <span className="text-sm font-normal text-gray-500">({orders.length})</span>
      </h3>
      
      <div className="space-y-2 max-h-96 overflow-y-auto">
        {orders.length === 0 ? (
          <div className="text-center py-8">
            <Activity size={48} className="mx-auto text-gray-400 mb-4" />
            <p className="text-gray-500 dark:text-gray-400">No orders yet</p>
            <p className="text-sm text-gray-400 dark:text-gray-500">Your trading activity will appear here</p>
          </div>
        ) : (
          orders.slice(0, 20).map((order, index) => (
            <div 
              key={order.slNo || index} 
              className="flex justify-between items-center p-3 border dark:border-gray-700 rounded hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  {getActivityIcon(order.activity)}
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {order.stockTicker || 'N/A'}
                    </span>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getActivityColor(order.activity)}`}>
                      {order.activity}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {order.timeStamp && (
                      <>
                        {formatDate(order.timeStamp)} at {formatTime(order.timeStamp)}
                      </>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <div className="font-semibold text-gray-900 dark:text-white">
                  {formatCurrency(order.totalAmount || 0)}
                </div>
                {order.units > 0 && (
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {formatNumber(order.units)} units @ {formatCurrency(order.unitPrice || 0)}
                  </div>
                )}
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  Balance: {formatCurrency(order.walletBalance || 0)}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </Card>
  );
};

export default OrderHistory;