import {createCategory, getCategories } from '@/firebase/db';
import Category from '@/firebase/models/Category';

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
    async updateCategory({state, getters, commit}, data) {
        const instance = new Category(data);

        await instance.save().then( () => {
            commit('updateCategory', instance.normalizedData())
        })
    }
}