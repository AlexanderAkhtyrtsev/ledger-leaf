<template>
  <v-card>
    <v-card-title>User Settings</v-card-title>
    <v-card-text>
      <v-form>
        <v-select
            v-model="favoriteCurrency"
            :items="currencies"
            @update:modelValue="saveCurrency"
            label="Favorite Currency"
        ></v-select>
        <v-divider class="my-4"></v-divider>
        <v-row>
          <v-col v-for="currency in currencies" :key="currency">
              <div>{{ currency }}</div>
              <div>{{ formatCurrency(calculateRateToFavourite(currency), favoriteCurrency) }}</div>
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script setup>
import {ref, onMounted, computed} from 'vue';
import {formatCurrency} from '@/helpers';
import User from '@/firebase/models/User';
import store from '@/store';


const favoriteCurrency = ref(User.current.getSettings('currency') || 'USD');

const currencies = computed( () => ["UAH", "GBP", "USD", "EUR", "PLN"].filter( c => c !== favoriteCurrency.value));

const calculateRateToFavourite = store.getters.calculateRateToFavourite;


const saveCurrency = () => {
  User.current.saveSetting('currency', favoriteCurrency.value).catch(e => {
    store.commit('addError', e.message || 'Unknown error');
  })
}

</script>

<style scoped>
.my-4 {
  margin-top: 16px;
  margin-bottom: 16px;
}
</style>
