import FirestoreModel from '@/firebase/models/FirestoreModel';
import {auth} from '@/firebase/auth';

export default class Category extends FirestoreModel {

    /**
     *
     * @param {String} id
     * @param {String} name
     * @param {String} type - need, must or want
     * @param {String} icon
     * @param {String} parentId
     * @param {Number|Boolean} archived
     */
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