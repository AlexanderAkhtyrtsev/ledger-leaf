import {getAuth, onAuthStateChanged} from 'firebase/auth';
import {app} from '@/firebase/index';
import store from '@/store';

export const auth = getAuth(app);

import { GoogleAuthProvider } from "firebase/auth";

export const provider = new GoogleAuthProvider();

onAuthStateChanged(auth, (user) => {
    store.state.user = user;

    if (user) {
        console.log("User is logged in:", user);
    } else {
        console.log("No user is logged in");
    }
});


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