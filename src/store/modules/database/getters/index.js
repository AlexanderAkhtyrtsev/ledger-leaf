export default {
    accounts: state => state.accounts,
    categories: state => state.categories,
    getCategoryById: state => id => state.categories.find(category => category.id === id),


    transactions: state => state.transactions.map(transaction => {
        const category = state.categories.find(category => category.id === transaction.categoryId);

        return {
            ...transaction,
            category: category,
        };
    }),
}