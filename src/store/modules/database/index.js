import actions from './actions';
import getters from './getters';

export default {
    namespaced: true,

    state: () => ({
        accounts: [],
        categories: [],
        transactions: [],
    }),

    actions,
    getters,
}