import Account from '@/firebase/models/Account';

export default {
    async fetchAccounts({state}) {
        state.accounts = await Account.all()
    },
    async createAccount({state, dispatch}, accountData) {
        const account = new Account(accountData);

        return account.save()
            .then((r) => {
                dispatch('fetchAccounts')
                return r;
            });
    },
}