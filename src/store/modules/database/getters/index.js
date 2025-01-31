export default {
    getCategoryById: state => id => state.categories.find(category => category.id === id),
    getAccountById: state => id => state.accounts.find(account => account.id === id),
    accounts: state => {
        return [...state.accounts].map(account => {
            return{
                ...account,
                remaining: account.amount + (state.expenses[account.id] || 0),
            }
        });
    },

    userSettings: (state) => key => state.user?.settings?.[key],

    favouriteCurrency: (state, getters) => getters.userSettings('currency'),

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


    categories: (state, getters) => {
        const sorted = state.categories
            // Normalize data
            .map(c => {
                c.parentId = c.parentId || null;
                return c;
            })
            .filter( c => {
                return !c.archived;
            })
            .sort((a, b) => {
            // Categories without parentId come first
            if (!a.parentId && b.parentId) return -1;
            if (a.parentId && !b.parentId) return 1;

            // If both have or don't have parentId, sort alphabetically
            return a.name.localeCompare(b.name);
        });


        // Convert flat list to tree
        const buildTree = (parentId = null) =>
            sorted
                .filter((category) => category.parentId === parentId)
                .map((category) => ({
                    ...category,
                    parent: getters.getCategoryById(parentId),
                    children: buildTree(category.id),
                }));

        return buildTree();
    }
}