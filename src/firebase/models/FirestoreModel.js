import { collection, doc, getDoc, getDocs, setDoc, deleteDoc, query, where } from 'firebase/firestore';
import {db} from '@/firebase'
import {auth} from '@/firebase/auth';

export default class FirestoreModel {
    constructor(attributes = {}) {
        Object.assign(this, attributes);
        this.collectionName = this.constructor.collectionName;
    }

    static get collectionName() {
        return '';
    }

    // Find a document by ID
    static async find(id) {
        const docRef = doc(collection(db, this.collectionName), id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return new this({ id: docSnap.id, ...docSnap.data() });
        }
        return null;
    }

    // Query documents with a "where" clause
    static async where(field, op, value) {
        const q = query(collection(db, this.collectionName), where(field, op, value));
        const querySnapshot = await getDocs(q);

        return querySnapshot.docs.map((doc) => new this({ id: doc.id, ...doc.data() }));
    }

    // Get all documents in the collection
    static async all() {
        const querySnapshot = await getDocs(collection(db, this.collectionName));
        return querySnapshot.docs.map((doc) => new this({ id: doc.id, ...doc.data() }));
    }

    // Save (create or update) the document
    async save() {
        const args = [ collection(db, this.collectionName), this.id ].filter( a => a );

        const ref = doc(...args); // Use `id` if available, else create new

        const {id, ...data} = this.normalizedData(); // Don't save the `id` in the document

        await setDoc(ref, data);
        this.id = ref.id; // Assign the generated ID
    }

    // Delete the document
    async delete() {
        if (!this.id) throw new Error('Cannot delete a document without an ID');
        const ref = doc(collection(db, this.collectionName), this.id);
        await deleteDoc(ref);
    }

    normalizedData() {
        return {...this};
    }
}