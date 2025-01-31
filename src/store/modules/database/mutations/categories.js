export default {
    updateCategory(state, data) {
        state.categories = state.categories.map( account => {
            if ( account.id === data['id'] ) {
                return data;
            }

            return account;
        } );
    },
}