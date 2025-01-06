import {createCategory, getCategories, updateCategory } from '@/firebase/db';

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
    async updateCategory({state, getters}, {id, ...data}) {
        const category = getters.getCategoryById(id);

        //await updateCategory(id, data)

        for(const field in data) {
            category[field] = data[field];
        }


        return category;
    }
}