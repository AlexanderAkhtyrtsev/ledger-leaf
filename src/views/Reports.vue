<template>
  <v-container class="pa-0 ma-0">
    <SwitchPeriod />

    <v-card class="my-2">
      <v-card-title v-if="loading || totals.length">
        <h3>Totals:</h3>
        <v-skeleton-loader
            v-if="loading"
            type="list-item"
        />
          <div
              v-if="totals.length"
              v-for="([currency, amount]) in totals"
          >
            <Currency :amount="-amount" :currency="currency" />
          </div>
      </v-card-title>
    </v-card>

    <v-row class="align-content-stretch">
      <v-col cols="12" lg="6">
        <GeneralReport v-if="loading || totals.length"/>
      </v-col>
      <v-col cols="12" lg="6">
        <TopExpenses v-if="loading || totals.length"/>
      </v-col>
    </v-row>


    <v-card v-if="!totals.length && !loading" class="d-flex justify-center align-center">
      <v-card-title>No reports fo this period.</v-card-title>
    </v-card>
  </v-container>
</template>

<script setup>
import GeneralReport from '@/views/reports/GeneralReport.vue';
import {computed} from 'vue';
import store from '@/store';
import Currency from '@/views/components/unit/Currency.vue';
import SwitchPeriod from '@/views/components/unit/SwitchPeriod.vue';
import TopExpenses from '@/views/reports/TopExpenses.vue';

const loading = computed(() => store.getters['database/isLoading']('transactions'));

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