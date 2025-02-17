<template>
  <v-container class="pa-0 ma-0">
    <SwitchPeriod />

    <Totals />

    <v-row class="align-content-stretch">
      <v-col cols="12" lg="6">
        <GeneralReport v-if="loading || dataExists"/>
      </v-col>
      <v-col cols="12" lg="6">
        <TopExpenses v-if="loading || dataExists"/>
      </v-col>
    </v-row>


    <v-card v-if="!dataExists && !loading" class="d-flex justify-center align-center">
      <v-card-title>No reports fo this period.</v-card-title>
    </v-card>
  </v-container>
</template>

<script setup>
import GeneralReport from '@/views/reports/GeneralReport.vue';
import {computed} from 'vue';
import store from '@/store';
import SwitchPeriod from '@/views/components/unit/SwitchPeriod.vue';
import TopExpenses from '@/views/reports/TopExpenses.vue';
import Totals from '@/views/reports/Totals.vue';

const loading = computed(() => store.getters['database/isLoading']('transactions'));

const dataExists = computed( () => store.getters['database/transactions'].filter( t => t.amount < 0 ).length);

</script>

<style scoped>

</style>