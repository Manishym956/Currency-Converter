const API_KEY = import.meta.env.VITE_EXCHANGE_RATE_API_KEY;
const BASE_URL = 'https://v6.exchangerate-api.com/v6';

export const fetchExchangeRates = async (fromCurrency) => {
    try {
        if (!API_KEY) {
            throw new Error('API key not found. Please check your environment variables.');
        }
        
        const response = await fetch(`${BASE_URL}/${API_KEY}/latest/${fromCurrency}`);
        if (!response.ok) {
            throw new Error('Failed to fetch exchange rates');
        }
        const data = await response.json();
        if (data.result === 'error') {
            throw new Error(data['error-type']);
        }
        return data;
    } catch (error) {
        throw new Error(`Error fetching rates: ${error.message}`);
    }
};

export const fetchHistoricalRates = async (fromCurrency, toCurrency, days = 7) => {
    try {
        if (!API_KEY) {
            throw new Error('API key not found. Please check your environment variables.');
        }
        
        const endDate = new Date();
        const startDate = new Date();
        startDate.setDate(endDate.getDate() - days);
        
        const response = await fetch(`${BASE_URL}/${API_KEY}/history/${fromCurrency}/${startDate.toISOString().split('T')[0]}/${endDate.toISOString().split('T')[0]}`);
        if (!response.ok) {
            throw new Error('Failed to fetch historical rates');
        }
        const data = await response.json();
        if (data.result === 'error') {
            throw new Error(data['error-type']);
        }
        return data;
    } catch (error) {
        throw new Error(`Error fetching historical rates: ${error.message}`);
    }
}; 