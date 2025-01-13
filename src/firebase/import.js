import {auth} from '@/firebase/auth';
import {addDoc, collection, doc, writeBatch} from 'firebase/firestore';
import {db, db as firestore} from '@/firebase/index';
import {findIconByKeyword} from '@/helpers/categories-icons';
import {getCategories} from '@/firebase/db';
import Account from '@/firebase/models/Account'


export const uploadToFirestore = async (transactions) => {
    const collectionRef = collection(firestore, 'users', auth.currentUser.uid, 'transactions');
    let batch = writeBatch(firestore);
    let counter = 0;

    console.log('Creating accounts and categories')
    await Promise.all(
        [
            createAccounts(transactions),
            createCategories(transactions)
        ]
    )


    const [ accounts, categories ] = await Promise.all([
        Account.all(),
        getCategories()
    ])

    console.log('Done')
    console.log('Importing transactions...');

    for (const transaction of transactions) {
        const docRef = doc(collectionRef);

        batch.set(docRef, {
            accountId: accounts.find( acc => acc.name.toLowerCase() === transaction.account.toLowerCase())?.id || 'unknown',
            amount: parseFloat(transaction.amount),
            categoryId: categories.find( cat => cat.name === transaction.category )?.id || null,
            date: new Date(transaction.date),
            note: transaction.note || null,
        });

        counter++;

        // Commit batch every 500 records
        if (counter % 500 === 0) {
            await batch.commit();
            batch = writeBatch(firestore);
            console.log('Batch has been written')
        }
    }

    // Commit remaining batch
    if (counter % 500 !== 0) {
        await batch.commit();
    }

    console.log('Last batch has been written')
    console.log('Done')
};

const createAccounts = (transactions) => {
    const unique = Array.from(new Set(
        transactions.map(t => JSON.stringify([t.account, t.currency])),
    ));

    const accountData = unique.map(account => {
        const [name, currency] = JSON.parse(account);
        return {
            name,
            currency,
            amount: 0,
            note: '',
            userId: auth.currentUser.uid,
            createdAt: new Date(),
        }
    });

    return Promise.all(
        accountData.map(account => {
            return addDoc(
                collection(
                    db,
                    'users',
                    auth.currentUser.uid,
                    'accounts'
                ),
                account
            )
        })
    )
}
const createCategories = (transactions) => {
    const unique = Array.from(new Set(transactions.map(t => t.category)))
        .filter( category => !['transfer'].includes(category.toLowerCase()) )

    const data = unique.map(category => {
        return {
            name: category,
            icon: findIconByKeyword( category ),
            type: 'need',
            userId: auth.currentUser.uid,
            parentId: null,
            createdAt: new Date(),
        }
    });

    return Promise.all(
        data.map(category => {
            return addDoc(
                collection(
                    db,
                    'users',
                    auth.currentUser.uid,
                    'categories'
                ),
                category
            )
        })
    )
}