<template>
  <TransactionsList />
  <CreateTransaction />
</template>

<script setup>
import {DateTime} from 'luxon';
import {computed, ref} from 'vue';
import CreateTransaction from '@/views/components/modal/CreateTransaction.vue';
import store from '@/store'
import TransactionsList from '@/views/components/TransactionsList.vue';

const updateKey = ref(0);

const groupedTransactions = computed(() => {
  const grouped = {};

  updateKey.value++;

  store.getters['database/transactions']
      .sort((a, b) => b.date - a.date) // Sort transactions by date (latest first)
      .forEach(transaction => {
        const dateKey = DateTime.fromJSDate(transaction.date.toDate()).toISODate(); // Group by date
        if (!grouped[dateKey]) {
          grouped[dateKey] = {transactions: [], total: 0};
        }
        grouped[dateKey].transactions.push(transaction);
        grouped[dateKey].total += transaction.amount < 0 ? transaction.amount : 0; // Sum only expenses
      });

  return Object.entries(grouped).map(([date, {transactions, total}]) => ({
    date,
    transactions,
    total
  }));
});

const loadMore = async ({done}) => {
  await store.dispatch('database/fetchTransactions')
  updateKey.value++;
  done('ok')
}

const displayDescription = (transaction, isTitle) => {
  const category = (transaction.category ? transaction.category.name : `Transfer ${transaction.amount < 0 ? '<-' : '->'} ` + transaction.account.name);
  if ( isTitle ) {
    return transaction.note || category
  }

  return transaction.note ? category : ''
}

const viewTransaction = transaction => {
  console.log('Viewing transaction:', transaction);
};
</script>
