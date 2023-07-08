import CONFIG from '../utils/config';
import {httpClient} from '../utils/httpClient';
import URL from '../utils/url';

// fsym=BTC&tsyms=USD,JPY,EUR
export async function getCryptoPrice(symbol, targetSymbol = 'INR') {
  try {
    return await httpClient.get(URL.CRYPTO_PRICE, {
      fsyms: symbol,
      tsyms: targetSymbol,
    });
  } catch (err) {
    console.log('GET_DATA ERROR', err);
  }
}

// lang=EN
export async function getLatestNewsArticles(language = 'EN') {
  try {
    return await httpClient.get(URL.LATEST_NEWS_ARTICLES, {
      lang: language,
    });
  } catch (err) {
    console.log('GET_DATA ERROR', err);
  }
}

// fsym=BTC&tsym=USD&limit=10
export async function getOHLCVMinute(symbol, targetSymbol = 'INR', limit = 25) {
  try {
    return await httpClient.get(URL.OHLCV_MINUTE, {
      fsym: symbol,
      tsym: targetSymbol,
      limit: limit,
    });
  } catch (err) {
    console.log('GET_DATA ERROR', err);
  }
}

// fsym=BTC&tsym=USD&limit=10
export async function getOHLCVHour(symbol, targetSymbol = 'INR', limit = 25) {
  try {
    return await httpClient.get(URL.OHLCV_HOUR, {
      fsym: symbol,
      tsym: targetSymbol,
      limit: limit,
    });
  } catch (err) {
    console.log('GET_DATA ERROR', err);
  }
}

// fsym=BTC&tsym=USD&limit=10
export async function getOHLCVDay(symbol, targetSymbol = 'INR', limit = 25) {
  try {
    return await httpClient.get(URL.OHLCV_DAY, {
      fsym: symbol,
      tsym: targetSymbol,
      limit: limit,
    });
  } catch (err) {
    console.log('GET_DATA ERROR', err);
  }
}

// limit=25&tsym=INR
export async function getTopCryptos(limit = 25, targetSymbol = 'INR') {
  try {
    return await httpClient.get(URL.TOP_CRYPTOS, {
      limit: limit,
      tsym: targetSymbol,
    });
  } catch (err) {
    console.log('GET_DATA ERROR', err);
  }
}
