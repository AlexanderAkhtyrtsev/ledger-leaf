import FirestoreModel from '@/firebase/models/FirestoreModel';
import {Timestamp} from 'firebase/firestore';
import {auth} from '@/firebase/auth';

export default class Account extends FirestoreModel {
    constructor({ id, name, currency, amount, userId, note, createdAt, icon}) {
        super({
            id,
            icon,
            name,
            currency,
            amount,
            note,
            userId,
            createdAt,
        });
    }

    static get collectionName() {
        return `users/${auth.currentUser.uid}/accounts`;
    }

    normalizedData() {
        return {
            ...this,
            amount: +this.amount,
            icon: this.icon || 'mdi-wallet',
            createdAt: this.date instanceof Timestamp ? this.date : Timestamp.fromDate( new Date( this.date ) )
        }
    }
}