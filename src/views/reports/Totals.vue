<script setup>
import Currency from '@/views/components/unit/Currency.vue';
import {computed} from 'vue';
import store from '@/store';

const currencies = computed(() => {
  return [...new Set ( store.getters['database/expenses'].map(t => t.account.currency) )]
})

const total = computed(() => {
  return (store.getters['database/expenses']
      .reduce((sum, item) => {
        if (!item.category || item.amount > 0) {
          return sum;
        }

        const amount = currencies.value.length > 1
                       ? store.getters.convertAmounts(
                            item.account.currency,
                            store.getters['database/favouriteCurrency'],
                            Math.abs(item.amount),
                        )
                       : Math.abs(item.amount)

        sum += amount;

        return sum;
      }, 0));
});


const loading = computed(() => store.getters['database/isLoading']('transactions'));
</script>

<template>
  <v-card class="my-2">
    <v-card-title v-if="loading || total">
      <h3>Totals:</h3>
      <v-skeleton-loader
          v-if="loading"
          type="list-item"
      />
      <div v-if="total">
        <Currency :amount="-total"
                  :mixed-currencies="currencies.length > 1"
                  :currency="currencies.length === 1 ? currencies[0] : store.getters['database/favouriteCurrency']"
        />
      </div>
    </v-card-title>
  </v-card>
</template>

<style scoped>

</style>