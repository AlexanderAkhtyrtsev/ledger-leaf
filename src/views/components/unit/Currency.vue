<template>
  <span :title="title"
  >
    {{ formatCurrency(convertedAmount, fav) }}{{ annotation }}
  </span>
</template>

<script setup>
import {formatCurrency} from '@/helpers';
import store from '@/store';
import {computed} from 'vue';
import {useI18n} from 'vue-i18n';

const {t} = useI18n();

const {amount, currency, mixedCurrencies} = defineProps({
  amount: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    default: () => store.getters['database/favouriteCurrency'],
  },
  mixedCurrencies: {
    type: Boolean,
    default: () => false,
  },
})

const convertedAmount = computed( () => store.getters.calculateRateToFavourite( currency ) * amount );
const fav = computed( () => store.getters['database/favouriteCurrency'] );

const isConverted = computed( () => fav.value !== currency )



const title = computed(() => {
  return isConverted.value
         ? formatCurrency(amount, currency)
         : mixedCurrencies ? t('Mixed currencies') : null
});

const annotation = computed(() => {
  return isConverted.value ? '*' : mixedCurrencies ? '**' : '';
})

</script>


<style scoped>

</style>