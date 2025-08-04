// src/components/layout/PriceMarquee.js
import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

const PriceMarquee = ({ prices, isLoading }) => {
  if (isLoading) {
    return (
      <div className="bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 text-white py-3 overflow-hidden">
        <div className="flex items-center space-x-8">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="flex items-center space-x-2">
              <div className="w-16 h-4 bg-gray-700 rounded animate-pulse"></div>
              <div className="w-12 h-4 bg-gray-700 rounded animate-pulse"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 text-white py-3 overflow-hidden relative">
      <div className="flex animate-marquee whitespace-nowrap">
        {prices.map((price, index) => (
          <span 
            key={`${price.symbol}-${index}`} 
            className={`mx-8 flex items-center space-x-2 ${
              price.change >= 0 ? 'text-green-400' : 'text-red-400'
            }`}
          >
            <span className="font-semibold">{price.symbol}</span>
            <span>₹{price.price}</span>
            <span className="flex items-center">
              {price.change >= 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
              {Math.abs(price.change).toFixed(2)}%
            </span>
          </span>
        ))}
      </div>
    </div>
  );
};

export default PriceMarquee;