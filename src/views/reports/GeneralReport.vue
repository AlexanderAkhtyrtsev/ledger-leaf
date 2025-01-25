<template>
  <v-card>
    <v-card-title>Expenses by Category</v-card-title>

    <v-card-text>
      <GChart type="PieChart" :data="props.data" :options="options" />
    </v-card-text>
  </v-card>

</template>

<script setup>
import {ref} from 'vue';
import {GChart} from 'vue-google-charts';


const props = defineProps(['data'])

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
</script>

<style scoped>

</style>