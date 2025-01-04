import actions from './actions';
import getters from './getters';

export default {
    namespaced: true,

    state: () => ({
        accounts: [],
        categories: [],
        transactions: [],
        expenses: {},
    }),

    actions,
    getters,
}