import transactions from '@/store/modules/database/mutations/transactions';
import accounts from '@/store/modules/database/mutations/accounts';
import categories from '@/store/modules/database/mutations/categories';

export default {
    ...transactions,
    ...accounts,
    ...categories,

    shiftPeriod( state, months = 1 ) {
        state.date.start = state.date.start.minus({ month: months }).startOf('month');
        state.date.end = state.date.start.endOf('month');
    },

}