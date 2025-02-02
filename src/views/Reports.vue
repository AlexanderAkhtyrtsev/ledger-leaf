<template>
  <v-container class="pa-0 ma-0">
    <SwitchPeriod />

    <v-card class="my-2">
      <v-card-title>
        <h3>Totals:</h3>
          <div v-if="totals.length" v-for="([currency, amount]) in totals"
        ><Currency :amount="-amount" :currency="currency" /></div>
      </v-card-title>
    </v-card>

    <GeneralReport />
  </v-container>
</template>

<script setup>
import GeneralReport from '@/views/reports/GeneralReport.vue';
import {computed} from 'vue';
import store from '@/store';
import Currency from '@/views/components/unit/Currency.vue';
import SwitchPeriod from '@/views/components/unit/SwitchPeriod.vue';


const totals = computed(() => {
  return Object.entries(store.getters['database/transactions']
      .reduce((sum, item) => {
          if (!item.category || item.amount > 0) {
            return sum;
          }

          sum[item.account.currency] = (sum[item.account.currency] || 0) + Math.abs(item.amount);

          return sum;
      }, {})
  )
});

</script>

<style scoped>

</style>