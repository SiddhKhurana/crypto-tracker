import React, { useEffect, useState, useRef } from 'react';
import Header from './components/Header';
import CoinSelector from './components/CoinSelector';
import CryptoChart from './components/CryptoChart';
import { getActiveCoins, getCoinChartData, getCoinMarketData } from './api';

function App() {
  const [coins, setCoins] = useState([]);
  const [selectedCoin, setSelectedCoin] = useState('');
  const [chartData, setChartData] = useState(null);
  const [coinInfo, setCoinInfo] = useState(null);
  const currentCoinRef = useRef('');

  // Load coins for dropdown
  useEffect(() => {
    getActiveCoins().then((res) => setCoins(res.data));
  }, []);

  const fetchData = async (coinId, signal) => {
    console.log("Fetching data for:", coinId);
    currentCoinRef.current = coinId;
    setChartData(null);
    setCoinInfo(null);

    try {
      const chartRes = await getCoinChartData(coinId, 1, signal);
      if (currentCoinRef.current === coinId) {
        setChartData(chartRes.data);
      }
    } catch (err) {
      console.error("Chart fetch error:", err.message);
    }

    try {
      const infoRes = await getCoinMarketData(coinId, signal);
      if (currentCoinRef.current === coinId) {
        setCoinInfo(infoRes.data.market_data);
      }
    } catch (err) {
      console.error("Info fetch error:", err.message);
    }
  };

  // Trigger fetch on coin change with debounce
  useEffect(() => {
    if (!selectedCoin) return;

    const controller = new AbortController();
    const delay = setTimeout(() => {
      fetchData(selectedCoin, controller.signal);
    }, 500); // debounce delay

    return () => {
      clearTimeout(delay);
      controller.abort();
    };
  }, [selectedCoin]);

  return (
    <div className="container">
      <Header />
      <CoinSelector coins={coins} onSelect={setSelectedCoin} />

      {selectedCoin && chartData && (
        <div className="fade-in">
          <CryptoChart data={chartData} />
        </div>
      )}

      {selectedCoin && coinInfo && (
        <div className="fade-in" style={{ textAlign: 'center', marginTop: '20px' }}>
          <h3>Current Price: ${coinInfo.current_price.usd.toLocaleString()}</h3>
          <p>Market Cap: ${coinInfo.market_cap.usd.toLocaleString()}</p>
          <p>24h Change: {coinInfo.price_change_percentage_24h.toFixed(2)}%</p>
        </div>
      )}
    </div>
  );
}

export default App;
