<template>
  <v-card>
    <v-card-title>Top Expenses</v-card-title>

    <v-card-text>
      <v-list lines="two" v-if="topExpenses" density="compact">
        <v-list-item
            v-for="transaction in topExpenses"
            :key="transaction.id"
        >
          <template v-slot:title>{{ displayDescription(transaction, true) }}</template>
          <template v-slot:subtitle>{{ displayDescription(transaction)}}</template>

          <v-list-item-subtitle class="text-high-emphasis">
            <Date v-model="transaction.date" />
          </v-list-item-subtitle>

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
    </v-card-text>
  </v-card>
</template>

<script setup>
import store from '@/store';
import eventBus from '@/eventBus';
import Currency from '@/views/components/unit/Currency.vue';
import {computed} from 'vue';
import {DateTime} from 'luxon';
import Date from '@/views/components/unit/Date.vue';

const topExpenses = computed( () => store.getters['database/transactions']
    .filter( t => t.amount < 0 ) // exclude incomes
    .filter( t => t.categoryId ) // exclude transfers
    .sort( (t1, t2) => t1.amount < t2.amount ? -1 : 1 )
    .slice(0, 5)
);


const displayDescription = (transaction, isTitle) => {
  const category = (transaction.category ? transaction.category.name : `Transfer ${transaction.amount < 0 ? '<-' : '->'} ` + transaction.account.name);
  if ( isTitle ) {
    return transaction.note || category
  }

  return transaction.note ? category : ''
}
</script>

<style scoped>

</style>