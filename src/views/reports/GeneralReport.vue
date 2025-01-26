<template>
  <v-card>
    <v-card-title>Expenses by Category</v-card-title>

    <v-card-text>
      <GChart
          v-for="([currency, chartData]) in Object.entries(calculated)"
          type="PieChart" :data="getData(chartData)" :options="options" />
    </v-card-text>
  </v-card>
</template>

<script setup>
import {computed, ref} from 'vue';
import {GChart} from 'vue-google-charts';
import store from '@/store';

const options = ref({
  chart: {
    title: '',
    subtitle: '',
  },
  is3D: true,
  pieSliceText: 'label',
  backgroundColor: 'transparent',
  legend: {
    position: 'bottom',
    textStyle: { color: 'white' },
  },
  chartArea: {'width': '95%', 'height': '95%'},
});


const calculated = computed(() => {
  return store.getters['database/transactions'].reduce( (sum, item) => {
    if ( !item.category || item.amount >= 0 )
      return sum;

    const pivot = sum[ item.account.currency ] = (sum[ item.account.currency ] || {});

    let category = item.category;

    while (category.parentId)
      category = store.getters['database/getCategoryById'](category.parentId)

    pivot[ category.name ] = (pivot[ category.name ] || 0) + Math.abs(item.amount);

    return sum;
  }, {});
})


const getData = (array) => {
  return [
    ['Category', 'Expenses',],
    ...Object.entries(array)
  ]
}

</script>

<style scoped>

</style>