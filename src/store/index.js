import {createStore} from 'vuex';
import database from '@/store/modules/database';

const store = createStore({
    state () {
        return {
            user: undefined,
            errors: [],
        }
    },
    mutations: {
      addError( state, errorMessage ) {
          state.errors = [ ...state.errors, errorMessage]
      }
    },
    getters: {
        isAuthenticated(state) {
            return !!state.user;
        }
    },
    modules: {
        database,
    }
});

export default store;