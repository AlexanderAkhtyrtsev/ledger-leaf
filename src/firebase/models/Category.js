import FirestoreModel from '@/firebase/models/FirestoreModel';
import {auth} from '@/firebase/auth';
import store from '@/store';

export default class Category extends FirestoreModel {
    constructor({ id, name, type, icon, parentId, }) {
        super({
            id,
            name,
            type,
            icon,
            parentId,
        });
    }

    static get collectionName() {
        return`users/${auth.currentUser.uid}/categories`;
    }

    normalizedData() {
        return {
            ...this,
            parentId: this.parentId || null,
        }
    }
}