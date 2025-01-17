import transactions from '@/store/modules/database/mutations/transactions';
import accounts from '@/store/modules/database/mutations/accounts';
export default {
    ...transactions,
    ...accounts,

    shiftPeriod( state ) {
        state.date.start = state.date.start.minus({ month: 1 }).startOf('month');
        state.date.end = state.date.start.endOf('month');
    },
}