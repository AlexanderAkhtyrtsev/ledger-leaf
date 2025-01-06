import {auth} from '@/firebase/auth';
import {addDoc, collection, getDocs, orderBy, query, startAfter, limit, updateDoc} from 'firebase/firestore';
import {db, db as firestore} from '@/firebase/index';


export async function getAccounts() {
    const user = auth.currentUser;
    if (!user) {
        console.error('No user is logged in');
        return [];
    }

    // Get the accounts for the current user
    const q = query(collection(firestore, 'users', user.uid, 'accounts'));
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
    }));
}


export async function createAccount(accountData) {

    const user = auth.currentUser;
    if (!user) {
        console.error('No user is logged in');
        return;
    }

    return addDoc(collection(db, 'users', user.uid, 'accounts'), accountData)
}

export async function getCategories() {
    try {
        const user = auth.currentUser;
        if (!user) {
            console.error('No user is logged in');
            return;
        }

        // Get the parent categories from Firestore
        const q = query(collection(firestore, 'users', user.uid, 'categories'));
        const querySnapshot = await getDocs(q);

        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));
    } catch (error) {
        console.error('Error fetching parent categories:', error);
    }
}

export async function createCategory(data) {
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
    )
}
export async function updateCategory(id, data) {
    const user = auth.currentUser;

    if (!user) {
        console.error('No user is logged in');
        return;
    }

    // Add the category to the 'categories' collection under the user UID
    return updateDoc(
        doc(
            firestore,
            'users',
            user.uid,
            'categories',
            id
        ), data
    )
}

let lastVisible = null; // Tracks the last document in the current batch
const transactions = []; // Store loaded transactions

export const getTransactions = async (batchSize = 50) => {
    try {
        let q;
        const transactionsCollection = collection(firestore, 'users', auth.currentUser.uid, 'transactions');

        if (lastVisible) {
            // Query starting after the last document
            q = query(
                transactionsCollection,
                orderBy('date', 'desc'),
                startAfter(lastVisible),
                limit(batchSize)
            );
        } else {
            // Initial query
            q = query(
                transactionsCollection,
                orderBy('date', 'desc'),
                limit(batchSize)
            );
        }

        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {
            transactions.push({ id: doc.id, ...doc.data() });
        });

        // Update the last visible document
        lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];

        // Check if there are more documents to load
        const hasMore = querySnapshot.docs.length === batchSize;

        return { transactions, hasMore };
    } catch (error) {
        console.error("Error loading transactions:", error);
        return { transactions: [], hasMore: false };
    }
};

export async function createTransaction(data) {
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
        ), data,
    )
}