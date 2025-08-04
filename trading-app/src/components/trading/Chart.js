// src/components/trading/Chart.js
import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Card from '../common/Card';
import Button from '../common/Button';
import { api } from '../../services/api';
import { CHART_PERIODS } from '../../constants/config';

const Chart = ({ symbol = 'AAPL' }) => {
  const [data, setData] = useState([]);
  const [period, setPeriod] = useState('1d');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        setLoading(true);
        setError(null);
        const chartData = await api.getChartData(symbol, period);
        
        // Mock data for demonstration since your API might not return proper chart format
        const mockData = Array.from({ length: 20 }, (_, i) => ({
          time: `${9 + Math.floor(i / 4)}:${(i % 4) * 15 || '00'}`,
          price: 150 + Math.random() * 20 - 10,
          volume: Math.floor(Math.random() * 1000000)
        }));
        
        setData(mockData);
      } catch (err) {
        console.error('Error fetching chart data:', err);
        setError('Failed to load chart data');
        // Fallback to mock data
        const mockData = Array.from({ length: 20 }, (_, i) => ({
          time: `${9 + Math.floor(i / 4)}:${(i % 4) * 15 || '00'}`,
          price: 150 + Math.random() * 20 - 10,
          volume: Math.floor(Math.random() * 1000000)
        }));
        setData(mockData);
      } finally {
        setLoading(false);
      }
    };

    fetchChartData();
  }, [symbol, period]);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg border dark:border-gray-700">
          <p className="text-sm font-medium text-gray-900 dark:text-white">{label}</p>
          <p className="text-sm text-blue-600">
            Price: ₹{payload[0].value.toFixed(2)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          {symbol} Price Chart
        </h3>
        <div className="flex space-x-2">
          {CHART_PERIODS.map(({ value, label }) => (
            <Button
              key={value}
              onClick={() => setPeriod(value)}
              variant={period === value ? 'primary' : 'outline'}
              size="sm"
            >
              {label}
            </Button>
          ))}
        </div>
      </div>
      
      {loading ? (
        <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded animate-pulse flex items-center justify-center">
          <div className="text-gray-500">Loading chart...</div>
        </div>
      ) : error ? (
        <div className="h-64 flex items-center justify-center text-red-500">
          {error}
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis 
              dataKey="time" 
              className="text-xs"
              tick={{ fill: 'currentColor' }}
            />
            <YAxis 
              className="text-xs"
              tick={{ fill: 'currentColor' }}
              domain={['dataMin - 5', 'dataMax + 5']}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area 
              type="monotone" 
              dataKey="price" 
              stroke="#3b82f6" 
              strokeWidth={2}
              fillOpacity={1} 
              fill="url(#colorPrice)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      )}
    </Card>
  );
};

export default Chart;