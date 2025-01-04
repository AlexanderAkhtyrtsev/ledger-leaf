export default {
    categories: state => state.categories,
    getCategoryById: state => id => state.categories.find(category => category.id === id),
    getAccountById: state => id => state.accounts.find(account => account.id === id),
    accounts: state => {
        return [...state.accounts].map(account => {
            return{
                ...account,
                amount: account.amount + (state.expenses[account.id] || 0),
            }
        });
    },

    transactions: (state, getters) => state.transactions.map(transaction => {
        const category = getters['getCategoryById'](transaction.categoryId);
        const account = getters['getAccountById'](transaction.accountId);

        return {
            ...transaction,
            currency: account.currency || 'USD',
            category,
            account,
        };
    }),
}