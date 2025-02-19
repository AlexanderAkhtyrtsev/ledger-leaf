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
        loading: {},
        date: {
            start: DateTime.utc().startOf('month'),
            end: DateTime.utc().endOf('month'),
        },
        filters: {
            accounts: [],
            type: '',
            categories: [],
        },
    }),

    actions,
    getters,
    mutations,
}