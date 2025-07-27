import React from 'react';

const CoinSelector = ({ coins, onSelect }) => {
  return (
    <div style={{ textAlign: 'center' }}>
      <select onChange={(e) => onSelect(e.target.value)}>
        <option value="">Select a coin</option>
        {coins.map((coin) => (
          <option key={coin.id} value={coin.id}>
            {coin.name} ({coin.symbol.toUpperCase()})
          </option>
        ))}
      </select>
    </div>
  );
};

export default CoinSelector;
