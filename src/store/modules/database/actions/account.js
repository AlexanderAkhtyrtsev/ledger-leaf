import Account from '@/firebase/models/Account';

export default {
    async fetchAccounts({state}) {
        state.accounts = await Account.all()
    },
    async createAccount({state, commit}, accountData) {
        const account = new Account(accountData);

        return account.save()
            .then((r) => {
                commit('createAccount', account.normalizedData())
                return r;
            });
    },
    async updateAccount({state, commit}, accountData) {
        const account = new Account(accountData);

        return account.save()
            .then((r) => {
                commit('updateAccount', account.normalizedData())
                return r;
            });
    },
    async deleteAccount({state,commit}, id) {
        const account = await Account.retrieve(id);

        account.delete().then( () => {
            commit('deleteAccount', id)
        })
    }
}