import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { initializeFirestore, persistentLocalCache } from "firebase/firestore";
import firebaseConfig from '@/firebase/config';


export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = initializeFirestore(app, {
    localCache: persistentLocalCache(),
});
