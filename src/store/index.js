import {createStore} from 'vuex';
import database from '@/store/modules/database';

const store = createStore({
    state () {
        return {
            user: undefined,
            errors: [],
            currencyRates: {},
        }
    },
    mutations: {
      addError( state, errorMessage ) {
          state.errors = [ ...state.errors, errorMessage]
      }
    },
    getters: {
        isAuthenticated(state) {
            return !!state.user;
        },
        calculateRateToFavourite: (state, getters) => (currency) => {
            const favorite = getters['database/favouriteCurrency'];
            const rates = state.currencyRates;

            if (rates && favorite)
                return (rates[favorite] * rates['USD']) / rates[currency];

            return 0;
        },
        convertAmounts: (state) => (currencyFrom, currencyTo, amount) => {
            const rates = state.currencyRates;
            const converted = ((rates[currencyTo] * rates['USD']) / rates[currencyFrom]) * amount;
            return +converted.toFixed(2);
        }
    },
    actions: {
        fetchCurrencyRates({ state, commit }) {
            const cacheKey = "currencyRates";
            const cacheTimeKey = "currencyRatesTimestamp";
            const cacheExpiration = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

            const storedRates = localStorage.getItem(cacheKey);
            const storedTimestamp = localStorage.getItem(cacheTimeKey);

            if (storedRates && storedTimestamp && Date.now() - storedTimestamp < cacheExpiration) {
                state.currencyRates = JSON.parse(storedRates);
                console.log('Currency Rates were retrieved from cache.')
                return;
            }

            fetch("https://api.exchangerate-api.com/v4/latest/USD")
                .then((res) => res.json())
                .then((data) => {
                    state.currencyRates = data.rates;
                    localStorage.setItem(cacheKey, JSON.stringify(data.rates));
                    localStorage.setItem(cacheTimeKey, Date.now().toString());
                })
                .catch((e) => commit("addError", e.message || "Unknown error"));
        },
    },
    modules: {
        database,
    }
});

export default store;