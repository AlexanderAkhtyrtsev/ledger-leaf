<template>
  <span :title="fav !== currency ? formatCurrency(amount, currency) : null"
  >
    {{ formatCurrency(converted, fav) }}{{ fav !== currency ? '*' : '' }}
  </span>
</template>

<script setup>
import {formatCurrency} from '@/helpers';
import store from '@/store';
import {computed} from 'vue';

const {amount, currency} = defineProps({
  amount: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    default: () => 'USD',
  }
})

const converted = computed( () => store.getters.calculateRateToFavourite( currency ) * amount );
const fav = computed( () => store.getters['database/favouriteCurrency'] );

</script>


<style scoped>

</style>