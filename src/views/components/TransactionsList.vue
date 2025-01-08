<template>
  <div>
    <Search v-model="search" />
    <v-infinite-scroll :items="groupedTransactions" :onLoad="loadMore" mode="manual">
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
              <div style="color: red;"> {{ group.total.toFixed(2) }}</div>
            </template>
          </v-list-item>

          <v-divider inset></v-divider>

          <v-list-item
              v-for="transaction in group.transactions"
              :key="transaction.id"
              :subtitle="displayDescription(transaction)"
              :title="displayDescription(transaction,true)"
          >
            <template v-slot:prepend>
              <v-avatar>
                <v-icon>{{ transaction.category?.icon }}</v-icon>
              </v-avatar>
            </template>

            <template v-slot:append>
              <div :style="{ color: transaction.amount > 0 ? 'green' : 'red' }">
                {{ transaction.amount > 0 ? '+' : '' }}{{ formatCurrency(transaction.amount, transaction.currency) }}
              </div>
            </template>

          </v-list-item>
        </v-list>
    </v-infinite-scroll>
  </div>
</template>

<script setup>
import {DateTime} from 'luxon';
import {computed, ref} from 'vue';
import {formatCurrency} from '@/helpers';
import store from '@/store'
import Search from '@/views/components/unit/Search.vue';

const updateKey = ref(0);

const search = ref('');

const groupedTransactions = computed(() => {
  const grouped = {};

  updateKey.value++;

  store.getters['database/transactions']
      .sort((a, b) => b.date - a.date) // Sort transactions by date (latest first)
      .filter( (t) => {
        const s = String(search.value).toLowerCase();
        if (!s) return true;

        return String(t.note || '').toLowerCase().includes(s)
            || String(t.category?.name || 'transfer').toLowerCase().includes(s)
      })
      .forEach(transaction => {
        const dateKey = DateTime.fromJSDate(transaction.date.toDate()).toISODate(); // Group by date
        if (!grouped[dateKey]) {
          grouped[dateKey] = {transactions: [], total: 0};
        }
        grouped[dateKey].transactions.push(transaction);
        grouped[dateKey].total += transaction.amount < 0 && transaction.category ? transaction.amount : 0; // Sum only expenses
      });

  return Object.entries(grouped).map(([date, {transactions, total}]) => ({
    date,
    transactions: transactions.sort(( t1, t2) => {return t1.date.toDate() > t2.date.toDate() ?  -1 : 1}),
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
</script>
