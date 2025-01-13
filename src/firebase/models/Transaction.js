import FirestoreModel from '@/firebase/models/FirestoreModel';
import {Timestamp} from 'firebase/firestore';
import {auth} from '@/firebase/auth';

export default class Transaction extends FirestoreModel {
    constructor({ id, amount, categoryId, accountId, date, note }) {
        super({
            id,
            amount: +amount,
            categoryId,
            accountId,
            date,
            note
        });
    }

    static get collectionName() {
        return`users/${auth.currentUser.uid}/transactions`;
    }

    normalizedData() {
        return {
            ...this,
            amount: +this.amount,
            date: this.date instanceof Timestamp ? this.date : Timestamp.fromDate( new Date( this.date ) )
        }
    }
}