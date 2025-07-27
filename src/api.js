import axios from 'axios';

const BASE_URL = 'https://api.coingecko.com/api/v3';

export const getActiveCoins = () =>
  axios.get(`${BASE_URL}/coins/markets`, {
    params: {
      vs_currency: 'usd',
      order: 'market_cap_desc',
      per_page: 50,
      page: 1,
    },
  });

export const getCoinMarketData = (id, signal) =>
  axios.get(`${BASE_URL}/coins/${id}`, {
    params: {
      localization: false,
      sparkline: false,
    },
    signal,
  });

export const getCoinChartData = (id, days = 1, signal) =>
  axios.get(`${BASE_URL}/coins/${id}/market_chart`, {
    params: {
      vs_currency: 'usd',
      days,
    },
    signal,
  });
