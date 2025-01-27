import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import {DateTime} from 'luxon';

export default {
    namespaced: true,

    state: () => ({
        accounts: [],
        categories: [],
        transactions: [],
        expenses: {},
        user: null,
        date: {
            start: DateTime.utc().startOf('month'),
            end: DateTime.utc(),
        }
    }),

    actions,
    getters,
    mutations,
}