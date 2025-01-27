import account from '@/store/modules/database/actions/account';
import category from '@/store/modules/database/actions/category';
import transaction from '@/store/modules/database/actions/transaction';
import {auth} from '@/firebase/auth';
import {collection, getAggregateFromServer, query, sum, where} from 'firebase/firestore';
import {db as firestore} from '@/firebase';
import User from '@/firebase/models/User';

export default {
    ...account,
    ...category,
    ...transaction,

    fetchData({ dispatch }) {
        return Promise.all([
            dispatch('fetchUser'),
            dispatch('fetchAccounts').then(() => dispatch('getExpenses')),
            dispatch('fetchCategories'),
            dispatch('fetchTransactions'),
        ]);
    },

    fetchUser({state}) {
        return User.find( auth.currentUser.uid )
            .then( u => state.user = u );
    },

    async getExpenses({state, commit} ) {
        const user = auth.currentUser;
        if (!user) {
            console.error('No user is logged in');
            return null;
        }


        for(const account of (state.accounts || [])){
            // Use aggregate query to calculate total expenses
            const q = query(
                collection(firestore, 'users', user.uid, 'transactions'),
                where('accountId', '==', account.id),
            );

            const {amount} = await getAggregateFromServer(q, {
                amount: sum('amount'),
            })
                .then(r => r.data())
                .catch(e => {
                    console.error('Error fetching expenses:', e);
                    commit('addError', e.message, {root: true})
                    return {amount: 0};
                });

            state.expenses[account.id] = amount || 0;
        }
    },
}