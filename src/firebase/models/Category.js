import FirestoreModel from '@/firebase/models/FirestoreModel';
import {auth} from '@/firebase/auth';

export default class Category extends FirestoreModel {
    constructor({ id, name, type, icon, parentId, archived}) {
        super({
            id,
            name,
            type,
            icon,
            archived,
            parentId,
        });
    }

    static get collectionName() {
        return`users/${auth.currentUser.uid}/categories`;
    }

    normalizedData() {
        return {
            ...this,
            archived: +!!this.archived,
            parentId: this.parentId || null,
        }
    }
}