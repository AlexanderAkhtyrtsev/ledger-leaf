import {addDoc, collection, getDocs, query} from 'firebase/firestore';
import {auth} from '@/firebase/auth';
import {db, db as firestore} from '@/firebase';

export default {
    namespaced: true,
    state: () => ({
        accounts: [],
        categories: [],
        transactions: [],
    }),
    actions: {
        async fetchAccounts({state} ) {
            try {
                const user = auth.currentUser;
                if (!user) {
                    console.error('No user is logged in');
                    return [];
                }

                // Get the accounts for the current user
                const q = query(collection(firestore, 'users', user.uid, 'accounts'));
                const querySnapshot = await getDocs(q);

                state.accounts = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                }));

                console.log(state.accounts)
            } catch (error) {
                console.error('Error fetching accounts:', error);
            }
        },
        async createAccount({state, dispatch}, accountData) {

            const user = auth.currentUser; // Get the current user
            if (!user) {
                console.error('No user is logged in');
                return;
            }
            // Add the account to the 'accounts' collection under the user UID
            return addDoc(collection(db, 'users', user.uid, 'accounts'), accountData)
                .then((r) => {
                    dispatch('fetchAccounts')
                    return r;
                });
        },
        async fetchCategories({ state }) {
            try {
                const user = auth.currentUser;
                if (!user) {
                    console.error('No user is logged in');
                    return;
                }

                // Get the parent categories from Firestore
                const q = query(collection(firestore, 'users', user.uid, 'categories'));
                const querySnapshot = await getDocs(q);

                state.categories = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                }));
            } catch (error) {
                console.error('Error fetching parent categories:', error);
            }
        },
        async createCategory({state, dispatch}, data) {
            const user = auth.currentUser;

            if (!user) {
                console.error('No user is logged in');
                return;
            }

            // Add the category to the 'categories' collection under the user UID
            return addDoc(
                collection(
                    firestore,
                    'users',
                    user.uid,
                    'categories'
                ), data
            ).then( r => {
                dispatch('fetchCategories')
                return r;
            } );
        },
        
        async fetchTransactions({state}) {
            try {
                const user = auth.currentUser;
                if (!user) {
                    console.error('No user is logged in');
                    return [];
                }

                // Get the transactions for the current user
                const q = query(collection(firestore, 'users', user.uid, 'transactions'));
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
                return r;
            }).catch(error => {
                console.error('Error creating transaction:', error);
            });
        },
    }
}