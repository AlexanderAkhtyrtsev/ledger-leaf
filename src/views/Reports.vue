<template>
  <v-container class="pa-0 ma-0">
    <v-card class="my-2">
      <v-card-title>
        <h3>Total:</h3>
        <div>-{{ formatCurrency(total, '') }}</div>
      </v-card-title>
    </v-card>

    <GeneralReport :data="data" />
  </v-container>
</template>

<script setup>

import {computed, ref} from 'vue';
import store from '@/store';
import {formatCurrency} from '../helpers';
import GeneralReport from '@/views/reports/GeneralReport.vue';

const calculated = computed(() => {
  return store.getters['database/transactions'].reduce( (sum, item) => {
    if ( !item.category || item.amount >= 0 )
      return sum;

    let category = item.category;

    while (category.parentId)
      category = store.getters['database/getCategoryById'](category.parentId)

    sum[ category.name ] = (sum[ category.name ] || 0) + Math.abs(item.amount);

    return sum;
  }, {});
})

const total = computed(() => {
  return Object.values(calculated.value).reduce((sum, n) => sum + n, 0);
});

const data = ref([
      ['Category', 'Expenses',],
      ...Object.entries(calculated.value)
])


</script>

<style scoped>

</style>