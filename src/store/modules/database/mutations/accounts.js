export default {
    createAccount(state, accountData) {
        state.accounts.push( accountData )
    },
    updateAccount(state, accountData) {
        state.accounts = state.accounts.map( account => {
            if ( account.id === accountData['id'] ) {
                return accountData;
            }

            return account;
        } );
    },
}