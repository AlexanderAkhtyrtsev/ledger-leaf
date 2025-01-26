import FirestoreModel from '@/firebase/models/FirestoreModel';
import {collection, doc, getDoc, setDoc} from 'firebase/firestore';
import {db} from '@/firebase';
import store from '@/store';

export default class User extends FirestoreModel {
    constructor({uid, displayName, email, lastLogin, settings}) {
        super({
            uid, displayName, email,
            lastLogin: lastLogin || null,
            settings: settings || {}
        });
    }

    static get collectionName() {
        return `users`;
    }

    static get current() {
        if ( store.state.database.user ) {
            return new User(store.state.database.user);
        }
    }

    static async find(id) {
        const docRef = doc(collection(db, this.collectionName), id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return new this({ uid: docSnap.id, ...docSnap.data() });
        }
        return null;
    }

    async save() {
        const ref = doc(db, 'users/' + this.uid); // Use `id` if available, else create new

        const {uid, ...data} = this.normalizedData(); // Don't save the `id` in the document

        await setDoc(ref, data);
        this.uid = ref.uid; // Assign the generated ID
    }

    saveSetting( key, value ) {
        this.settings[key] = value;
        return this.save();
    }

    getSettings(key, _default) {
        return this.settings[key] || _default;
    }

    normalizedData() {
        return {
            ...this,
            settings: this.settings || {},
        }
    }
}