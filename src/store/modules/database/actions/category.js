import {auth} from '@/firebase/auth';
import {addDoc, collection, getDocs, query} from 'firebase/firestore';
import {db as firestore} from '@/firebase';

export default {
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

}