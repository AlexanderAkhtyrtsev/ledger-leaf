import {createCategory, getCategories} from '@/firebase/db';

export default {
    async fetchCategories({ state }) {
        try {
            state.categories = await getCategories();
        } catch (error) {
            console.error('Error fetching parent categories:', error);
        }
    },
    async createCategory({state, dispatch}, data) {
        // Add the category to the 'categories' collection under the user UID
        return createCategory(data).then( r => {
            dispatch('fetchCategories')
            return r;
        } );
    },
}