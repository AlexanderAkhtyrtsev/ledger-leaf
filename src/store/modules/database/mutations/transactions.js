import {Timestamp} from 'firebase/firestore';

export default {
    createTransaction(state, transactionData) {
        state.transactions = [...state.transactions, {
            ...transactionData,
            date: transactionData.date instanceof Timestamp
                  ? transactionData.date
                  : Timestamp.fromDate( new Date(transactionData.date ?? Date.now()) ),
        }]

        console.log(transactionData)
        state.expenses[transactionData.accountId] += transactionData.amount;
    }
}