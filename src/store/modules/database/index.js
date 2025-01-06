import actions from './actions';
import getters from './getters';
import mutations from './mutations';

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
    mutations,
}