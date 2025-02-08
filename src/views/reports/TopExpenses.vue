<template>
  <v-card>
    <v-card-title>Top Expenses</v-card-title>

    <v-card-text>
      <v-skeleton-loader
          v-if="loading"
          v-for="i in 5"
          type="list-item-three-line"
          class="px-5"
      ></v-skeleton-loader>
      <TransactionList v-else :model-value="topExpenses" />
    </v-card-text>
  </v-card>
</template>

<script setup>
import store from '@/store';
import {computed} from 'vue';
import TransactionList from '@/views/components/TransactionList.vue';

const loading = computed(() => store.getters['database/isLoading']('transactions'));

const topExpenses = computed( () => store.getters['database/transactions']
    .filter( t => t.amount < 0 ) // exclude incomes
    .filter( t => t.categoryId ) // exclude transfers
    .sort( (t1, t2) => t1.amount < t2.amount ? -1 : 1 )
    .slice(0, 5)
);
</script>

<style scoped>

</style>