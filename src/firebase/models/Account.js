import FirestoreModel from '@/firebase/models/FirestoreModel';
import {auth} from '@/firebase/auth';
import store from '@/store';
import {collection, getDocs} from 'firebase/firestore';
import {db} from '@/firebase';

export default class Account extends FirestoreModel {
    constructor({ id, name, currency, amount, userId, note, icon, deletedAt}) {
        super({
            id,
            icon,
            name,
            currency,
            amount,
            note,
            userId,
            deletedAt,
        });
    }

    static async all() {
        const querySnapshot = await getDocs( collection(db, this.collectionName) );
        return querySnapshot.docs
            .filter((doc) => !doc.data().hasOwnProperty('deletedAt'))
            .map((doc) => new this({ id: doc.id, ...doc.data() }));
    }

    static async retrieve(id) {
        const fromStore = store.getters['database/accounts']
            .find( acc => acc.id === id);

        if ( fromStore )
            return new Account(fromStore);

        const fromDb = Account.find(id);
        if ( fromDb )
            return new Account(fromDb)
    }

    static get collectionName() {
        return `users/${auth.currentUser.uid}/accounts`;
    }

    async delete() {
        if (!this.id) throw new Error('Cannot delete a document without an ID');
        this.deletedAt = new Date();
        return this.save();
    }

    normalizedData() {
        return {
            ...this,
            amount: +this.amount,
            icon: this.icon || 'mdi-wallet',
        }
    }
}