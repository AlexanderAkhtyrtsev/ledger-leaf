<template>
  <v-container>
        <v-list lines="two"
                v-for="(group, index) in groupedTransactions" :key="index"
        >
          <v-list-item>
            <template v-slot:prepend>
              <v-list-subheader inset sticky>
                {{ DateTime.fromJSDate(new Date(group.date)).toFormat('MMMM dd, yyyy') }}
              </v-list-subheader>
            </template>
            <template v-slot:append>
              <v-text style="color: red;"> {{ group.total.toFixed(2) }}</v-text>
            </template>
          </v-list-item>

          <v-divider inset></v-divider>

          <v-list-item
              v-for="transaction in group.transactions"
              :key="transaction.id"
              :subtitle="transaction.note ? (transaction.category ? transaction.category.name : 'Uncategorized') : ''"
              :title="transaction.note || (transaction.category ? transaction.category.name : 'Uncategorized')"
          >
            <template v-slot:prepend>
              <v-avatar>
                <v-icon>{{ transaction.category?.icon }}</v-icon>
              </v-avatar>
            </template>

            <template v-slot:append>
              <v-text :style="{ color: transaction.amount > 0 ? 'green' : 'red' }">
                {{ transaction.amount > 0 ? '+' : '' }}{{ formatCurrency(transaction.amount) }}
              </v-text>
            </template>

          </v-list-item>
        </v-list>
    <CreateTransaction />
  </v-container>
</template>

<script setup>
import {DateTime} from 'luxon';
import {computed, onMounted} from 'vue';
import {useStore} from 'vuex';
import {formatCurrency} from '@/helpers';
import CreateTransaction from '@/components/core/modal/CreateTransaction.vue';

const store = useStore();

const transactions = computed(() => store.getters['database/transactions']);

const groupedTransactions = computed(() => {
  const grouped = {};

  transactions.value
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


store.dispatch('database/getExpenses');

onMounted(() => {
  store.dispatch('database/fetchTransactions');
  store.dispatch('database/fetchAccounts');
  store.dispatch('database/fetchCategories');
});

const viewTransaction = transaction => {
  console.log('Viewing transaction:', transaction);
};
</script>
