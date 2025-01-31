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
        fetchCurrencyRates({state, commit}) {
            fetch("https://api.exchangerate-api.com/v4/latest/USD")
                .then((res) => res.json())
                .then((data) => { state.currencyRates = data.rates; })
                .catch(e => commit('addError', e.message || 'Unknown error'))
            ;
        },
    },
    modules: {
        database,
    }
});

export default store;