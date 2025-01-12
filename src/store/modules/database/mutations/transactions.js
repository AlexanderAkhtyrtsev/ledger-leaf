import {Timestamp} from 'firebase/firestore';

export default {
    createTransaction(state, transactionData) {
        state.transactions = [...state.transactions, {
            ...transactionData,
            date: transactionData.date instanceof Timestamp
                  ? transactionData.date
                  : Timestamp.fromDate( new Date(transactionData.date ?? Date.now()) ),
        }]

        state.expenses[transactionData.accountId] += transactionData.amount;
    },
    updateTransaction(state, transactionData) {
        state.transactions = [
            ...state.transactions.filter( t => {
                if ( t.id === transactionData['id'] ) {
                    state.expenses[transactionData.accountId] -= t.amount;
                    return false;
                }

                return true;
            } ),

            transactionData
        ];

        state.expenses[transactionData.accountId] += transactionData.amount;
    }
}