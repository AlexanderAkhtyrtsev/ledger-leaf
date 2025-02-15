import {getAuth, onAuthStateChanged, signOut} from 'firebase/auth';
import {app} from '@/firebase/index';
import store from '@/store';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import {db} from '@/firebase';

export const auth = getAuth(app);

import { GoogleAuthProvider } from "firebase/auth";

export const provider = new GoogleAuthProvider();

onAuthStateChanged(auth, user => store.state.user = user);

export async function logout() {
    return signOut(auth)
        .then(() => {
            console.log('User logged out');
            store.state.database.user = null;
            return true;
        })
        .catch((error) => {
            console.error('Error logging out:', error);
            return false;
        });
}

export function checkAuthState() {
    return new Promise((resolve, reject) => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                resolve(user); // Resolves if the user is logged in
            } else {
                reject('No user is logged in'); // Rejects if no user is logged in
            }
        });
    });
}

export async function storeUser(user) {

    // Create a document reference in Firestore
    const userRef = doc(db, 'users', user.uid);

    // Check if the user already exists in Firestore
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
        // If user doesn't exist, store the user data
        await setDoc(userRef, {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            lastLogin: new Date(),
        });
        console.log('User data saved to Firestore');
    } else {
        await updateDoc(userRef, {
            lastLogin: new Date(),
        });
    }
}