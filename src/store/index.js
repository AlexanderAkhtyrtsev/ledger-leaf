import {createStore} from 'vuex';

const store = createStore({
    state () {
        return {
            user: undefined
        }
    },
});

export default store;