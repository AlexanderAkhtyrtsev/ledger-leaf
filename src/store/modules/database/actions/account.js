import {auth} from '@/firebase/auth';
import {addDoc, collection, getDocs, query} from 'firebase/firestore';
import {db, db as firestore} from '@/firebase';

export default {
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
}