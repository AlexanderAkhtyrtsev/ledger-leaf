import {createAccount, getAccounts} from '@/firebase/db';

export default {
    async fetchAccounts({state}) {
        state.accounts = await getAccounts()
    },
    async createAccount({state, dispatch}, accountData) {
        return createAccount(accountData)
            .then((r) => {
                dispatch('fetchAccounts')
                return r;
            });
    },
}