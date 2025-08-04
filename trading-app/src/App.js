import React, { useState } from 'react';
import Header from './components/layout/Header';
import PriceMarquee from './components/layout/PriceMarquee';
import PortfolioStats from './components/portfolio/PortfolioStats';
import TabNavigation from './components/navigation/TabNavigation';
import { useStocks } from './hooks/useStocks';
import { useWallet } from './hooks/useWallet';
import { usePrices } from './hooks/usePrices';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState('portfolio');
  
  const { stocks, watchlist, orders, loading: stocksLoading, refreshStocks } = useStocks();
  const { balance, loading: walletLoading, rechargeWallet } = useWallet();
  const { prices, currentPrices, loading: pricesLoading } = usePrices(stocks, watchlist);

  const handleRefresh = () => {
    refreshStocks();
  };

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
        <PriceMarquee prices={prices} isLoading={pricesLoading} />
        
        <Header 
          darkMode={darkMode} 
          onToggleDarkMode={() => setDarkMode(!darkMode)}
          onRefresh={handleRefresh}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <PortfolioStats 
            balance={balance}
            stocks={stocks}
            currentPrices={currentPrices}
            onRecharge={rechargeWallet}
            loading={{ wallet: walletLoading, stocks: stocksLoading }}
          />

          <TabNavigation
            activeTab={activeTab}
            onTabChange={setActiveTab}
            stocks={stocks}
            watchlist={watchlist}
            orders={orders}
            currentPrices={currentPrices}
            loading={stocksLoading}
          />
        </div>
      </div>
    </div>
  );
}

export default App;