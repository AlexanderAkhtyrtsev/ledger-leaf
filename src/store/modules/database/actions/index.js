import account from '@/store/modules/database/actions/account';
import category from '@/store/modules/database/actions/category';
import transaction from '@/store/modules/database/actions/transaction';
import {auth} from '@/firebase/auth';
import {collection, getAggregateFromServer, query, sum} from 'firebase/firestore';
import {db as firestore} from '@/firebase';

export default {
    ...account,
    ...category,
    ...transaction,


    async getExpenses() {
        const user = auth.currentUser;
        if (!user) {
            console.error('No user is logged in');
            return null;
        }

        // Use aggregate query to calculate total expenses
        const q = query(
            collection(firestore, 'users', user.uid, 'transactions')
        );

        const snapshot = await getAggregateFromServer(q, {
            amount: sum('amount')
        });

        return snapshot.data().amount;
    },
}