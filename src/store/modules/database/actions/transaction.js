import {auth} from '@/firebase/auth';
import {createTransaction, getTransactions} from '@/firebase/db';
import {Timestamp} from 'firebase/firestore'
import Transaction from '@/firebase/models/Transaction';

export default {
    async fetchTransactions({state}) {
        try {
            const {transactions, hasMore} = await getTransactions();

            state.transactions = transactions;
        } catch (error) {
            console.error('Error fetching transactions:', error);
        }
    },
    async createTransaction({state, commit}, transactionData) {
        const user = auth.currentUser;
        if (!user) {
            console.error('No user is logged in');
            return;
        }

        // Add the transaction to the 'transactions' collection under the user UID
        return createTransaction(transactionData).then(r => {
            commit('createTransaction', transactionData)
            return r;
        }).catch(error => {
            console.error('Error creating transaction:', error);
        });
    },
    async updateTransaction({state, commit}, transactionData) {
        const user = auth.currentUser;
        if (!user) {
            console.error('No user is logged in');
            return;
        }

        const instance = new Transaction(transactionData);

        return instance.save().then(r => {
            commit('updateTransaction', instance.normalizedData())
            return r;
        }).catch(error => {
            console.error('Error updating transaction:', error);
            commit('addError', 'Error updating transaction:' + error?.message, {root: true})
        });
    },
    async deleteTransaction({state, commit}, id) {
        return Transaction.delete(id)
            .then( () => { commit('deleteTransaction', id); return true; })
            .catch( error => {
                commit('addError', 'Error updating transaction:' + error?.message, {root: true})
            })
    },
    async createTransfer({state, commit, dispatch}, { source, target }) {
        dispatch('createTransaction', {
            amount: Math.abs(source.amount) * -1,
            categoryId: null,
            accountId: source.accountId,
            date: Timestamp.fromDate(new Date( Date.now() - 100)),
            note: source.note,
        })

        if ( target )
            dispatch('createTransaction', {
                amount: Math.abs(target.amount),
                categoryId: null,
                accountId: target.accountId,
                date: Timestamp.fromDate(new Date()),
                note: target.note,
            })
    }
}