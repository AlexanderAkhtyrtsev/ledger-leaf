<template>
  <v-card>
    <v-card-title>Expenses by Category</v-card-title>

    <v-card-text>
      <v-skeleton-loader
          v-if="loading"
          height="240"
          type="image, list-item-two-line"
      />
      <GChart
          v-if="!loading"
          type="PieChart" :data="getData(calculated)" :options="options" />
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

const loading = computed(() => store.getters['database/isLoading']('transactions'));

const calculated = computed(() => {
  return store.getters['database/expenses'].reduce( (sum, item) => {
    let category = item.category;

    while (category.parentId)
      category = store.getters['database/getCategoryById'](category.parentId)

    const amount = store.getters.convertAmounts(
        item.account.currency,
        store.getters['database/favouriteCurrency'],
        Math.abs(item.amount)
    )

    sum[ category.name ] = (sum[ category.name ] || 0) + amount;

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