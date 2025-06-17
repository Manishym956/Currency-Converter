import { useState, useEffect } from 'react'
import { fetchExchangeRates, fetchHistoricalRates } from './services/api'
import { currencies, getCurrencyByCode } from './data/currencies'
import './App.css'

function App() {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [exchangeRate, setExchangeRate] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [theme, setTheme] = useState('light');
  const [showHistory, setShowHistory] = useState(false);
  const [historicalData, setHistoricalData] = useState(null);
  const [recentConversions, setRecentConversions] = useState([]);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.body.setAttribute('data-theme', savedTheme);
    
    const savedConversions = localStorage.getItem('recentConversions');
    if (savedConversions) {
      setRecentConversions(JSON.parse(savedConversions));
    }
  }, []);

  useEffect(() => {
    const fetchExchangeRate = async () => {
      if (!amount || amount <= 0) {
        setConvertedAmount(null);
        setExchangeRate(null);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);
        const data = await fetchExchangeRates(fromCurrency);
        const rate = data.conversion_rates[toCurrency];
        setExchangeRate(rate);
        setConvertedAmount((amount * rate).toFixed(2));
        
        // Add to recent conversions
        const conversion = {
          from: fromCurrency,
          to: toCurrency,
          amount: amount,
          result: (amount * rate).toFixed(2),
          timestamp: new Date().toISOString()
        };
        
        const updatedConversions = [conversion, ...recentConversions.filter(c => 
          !(c.from === fromCurrency && c.to === toCurrency && c.amount === amount)
        )].slice(0, 5);
        
        setRecentConversions(updatedConversions);
        localStorage.setItem('recentConversions', JSON.stringify(updatedConversions));
      } catch (error) {
        setError(error.message);
        setConvertedAmount(null);
        setExchangeRate(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchExchangeRate();
  }, [fromCurrency, toCurrency, amount]);

  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const fetchHistoricalData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await fetchHistoricalRates(fromCurrency, toCurrency, 7);
      setHistoricalData(data);
      setShowHistory(true);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const formatCurrency = (value, currencyCode) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currencyCode,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };

  return (
    <div className={`app ${theme}`}>
      <div className="theme-switch">
        <button onClick={toggleTheme} className="theme-toggle" aria-label="Toggle theme">
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
      </div>
      
      <div className="container">
        <header className="header">
          <h1>Currency Converter</h1>
          <p className="subtitle">Real-time exchange rates and currency conversion</p>
        </header>

        {error && (
          <div className="error-message">
            <span>⚠️</span> {error}
          </div>
        )}

        <div className="converter-box">
          <div className="input-section">
            <div className="input-group">
              <label htmlFor="amount">Amount</label>
              <input
                id="amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
                min="0"
                step="0.01"
                disabled={isLoading}
                className="amount-input"
              />
            </div>

            <div className="currency-selector">
              <div className="input-group">
                <label htmlFor="from-currency">From</label>
                <div className="select-wrapper">
                  <select
                    id="from-currency"
                    value={fromCurrency}
                    onChange={(e) => setFromCurrency(e.target.value)}
                    disabled={isLoading}
                  >
                    {currencies.map(currency => (
                      <option key={currency.code} value={currency.code}>
                        {currency.flag} {currency.code} - {currency.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <button 
                onClick={handleSwap} 
                className="swap-button"
                disabled={isLoading}
                aria-label="Swap currencies"
              >
                ⇄
              </button>

              <div className="input-group">
                <label htmlFor="to-currency">To</label>
                <div className="select-wrapper">
                  <select
                    id="to-currency"
                    value={toCurrency}
                    onChange={(e) => setToCurrency(e.target.value)}
                    disabled={isLoading}
                  >
                    {currencies.map(currency => (
                      <option key={currency.code} value={currency.code}>
                        {currency.flag} {currency.code} - {currency.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="result-section">
            {isLoading ? (
              <div className="loading">
                <div className="spinner"></div>
                <span>Converting...</span>
              </div>
            ) : convertedAmount && exchangeRate ? (
              <div className="conversion-result">
                <div className="result-amount">
                  {formatCurrency(amount, fromCurrency)} = {formatCurrency(convertedAmount, toCurrency)}
                </div>
                <div className="exchange-rate">
                  1 {fromCurrency} = {exchangeRate.toFixed(4)} {toCurrency}
                </div>
                <button 
                  onClick={fetchHistoricalData}
                  className="history-button"
                  disabled={isLoading}
                >
                  📊 View 7-Day History
                </button>
              </div>
            ) : (
              <div className="no-result">
                Enter an amount to convert
              </div>
            )}
          </div>
        </div>

        {showHistory && historicalData && (
          <div className="history-section">
            <h3>📈 7-Day Exchange Rate History</h3>
            <div className="history-chart">
              {Object.entries(historicalData.conversion_rates)
                .sort(([dateA], [dateB]) => new Date(dateA) - new Date(dateB))
                .map(([date, rates]) => (
                  <div key={date} className="history-item">
                    <span className="date">{new Date(date).toLocaleDateString()}</span>
                    <span className="rate">1 {fromCurrency} = {rates[toCurrency]?.toFixed(4)} {toCurrency}</span>
                  </div>
                ))}
            </div>
            <button 
              onClick={() => setShowHistory(false)}
              className="close-history-button"
            >
              Close History
            </button>
          </div>
        )}

        {recentConversions.length > 0 && (
          <div className="recent-conversions">
            <h3>🕒 Recent Conversions</h3>
            <div className="conversions-list">
              {recentConversions.map((conversion, index) => (
                <div key={index} className="conversion-item">
                  <span className="conversion-amount">
                    {conversion.amount} {conversion.from} = {conversion.result} {conversion.to}
                  </span>
                  <span className="conversion-time">
                    {new Date(conversion.timestamp).toLocaleTimeString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
