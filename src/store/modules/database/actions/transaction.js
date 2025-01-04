import {auth} from '@/firebase/auth';
import {addDoc, collection, getDocs, orderBy, query} from 'firebase/firestore';
import {db as firestore} from '@/firebase';

export default {
    async fetchTransactions({state}) {
        try {
            const user = auth.currentUser;
            if (!user) {
                console.error('No user is logged in');
                return [];
            }

            // Get the transactions for the current user
            const q = query(collection(firestore, 'users', user.uid, 'transactions'), orderBy('date', 'desc'));

            const querySnapshot = await getDocs(q);

            state.transactions = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
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
        return addDoc(
            collection(
                firestore,
                'users',
                user.uid,
                'transactions',
            ), transactionData,
        ).then(r => {
            dispatch('fetchTransactions');
            dispatch('getExpenses');
            return r;
        }).catch(error => {
            console.error('Error creating transaction:', error);
        });
    },
}