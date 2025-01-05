import {auth} from '@/firebase/auth';
import {createTransaction, getTransactions} from '@/firebase/db';

export default {
    async fetchTransactions({state}) {
        try {
            const {transactions, hasMore} = await getTransactions();

            console.log(transactions, hasMore)
            state.transactions = transactions;
        } catch (error) {
            console.error('Error fetching transactions:', error);
        }
    },
    async createTransaction({state, dispatch}, transactionData) {
        const user = auth.currentUser;
        if (!user) {
            console.error('No user is logged in');
            return;
        }

        // Add the transaction to the 'transactions' collection under the user UID
        return createTransaction(transactionData).then(r => {
            dispatch('fetchTransactions');
            dispatch('getExpenses');
            return r;
        }).catch(error => {
            console.error('Error creating transaction:', error);
        });
    },
}