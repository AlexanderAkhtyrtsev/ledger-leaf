<template>
  <div>
    <Search v-model="search" v-if="store.getters['database/transactions']?.length" />

    <div v-if="groupedTransactions && groupedTransactions.length">
      <v-list lines="two"
              v-for="(group, index) in groupedTransactions" :key="index"
      >
        <v-list-item>
          <template v-slot:prepend>
            <v-list-item-title >
              {{ DateTime.fromJSDate(new Date(group.date)).toFormat('MMMM dd, yyyy') }}
            </v-list-item-title>
          </template>
          <template v-slot:append>
            <template  v-for="[currency, figure] in Object.entries(group.total)" >
              <div style="color: red;font-weight: bolder;" class="ml-2" v-if="figure">
                <Currency :amount="figure" :currency="currency" />
              </div>
            </template>
          </template>
        </v-list-item>

        <v-divider></v-divider>

        <v-list-item
            v-for="transaction in group.transactions"
            :key="transaction.id"
            :subtitle="displayDescription(transaction)"
            :title="displayDescription(transaction,true)"
            @click="eventBus.emit('update-transaction', transaction)"
        >
          <template v-slot:prepend>
            <v-avatar>
              <v-icon>{{ transaction.category?.icon }}</v-icon>
            </v-avatar>
          </template>

          <template v-slot:append>
            <div :style="{ color: transaction.amount > 0 ? 'green' : 'red' }">
              {{ transaction.amount > 0 ? '+' : '' }}
              <Currency :amount="transaction.amount" :currency="transaction.currency" />
            </div>
          </template>

        </v-list-item>
      </v-list>
    </div>
    <v-card class="d-flex justify-center align-center" v-else>
      <v-card-title>No transactions for this period.</v-card-title>
    </v-card>
  </div>
</template>

<script setup>
import {DateTime} from 'luxon';
import {computed, ref} from 'vue';
import store from '@/store'
import eventBus from '@/eventBus';
import Search from '@/views/components/unit/Search.vue';
import Currency from '@/views/components/unit/Currency.vue';

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
          grouped[dateKey] = {transactions: [], total: {}};
        }
        grouped[dateKey].transactions.push(transaction);
        grouped[dateKey].total[transaction.account.currency] = (grouped[dateKey].total[transaction.account.currency] || 0) + (transaction.amount < 0 && transaction.category ? transaction.amount : 0); // Sum only expenses
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
