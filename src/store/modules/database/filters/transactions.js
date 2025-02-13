import {DateTime} from 'luxon';
import store from '@/store';

export const date = ( transaction ) => {
    const date = DateTime.fromJSDate( transaction.date.toDate() ).toUTC();
    return date >= store.state.database.date.start && date <= store.state.database.date.end
}

/**
 * Filter transaction by account.
 *
 * @param transaction
 * @returns {boolean}
 */
export const accounts = (transaction) => {
    const accounts = store.state.database.filters.accounts;

    return !accounts.length
        || accounts.includes( transaction.accountId );
}

/**
 * Filter transaction by account.
 *
 * @param transaction
 * @returns {boolean}
 */
export const categories = (transaction) => {
    const categories = store.state.database.filters.categories;

    return !categories.length
        || categories.includes( transaction.categoryId );
}

/**
 * Filter by transaction type: expense/income
 * @param t
 */
export const type = (t) => {
    const type = store.state.database.filters.type;

    return !type
            || type === 'income' && t.amount > 0
            || type === 'expense' && t.amount < 0
}