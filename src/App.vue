<template>
  <v-app>
    <AppBar @toggle-drawer="drawer = !drawer" />
    <Sidebar v-model="drawer" v-if="!loading"/>

    <v-main>
      <v-snackbar
          color="error"
          v-for="error in store.state.errors"
          :model-value="true"
      >
        {{ error || t('Unknown Error') }}
      </v-snackbar>

      <v-progress-linear v-if="loading" indeterminate color="primary" />
      <v-container v-else>
        <router-view />


        <FilterTransactions v-if="showFilterDialog" @close="showFilterDialog = false" />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import Sidebar from '@/views/components/Sidebar.vue';
import AppBar from '@/views/components/AppBar.vue';
import {computed, ref, watch} from 'vue';
import store from '@/store';
import FilterTransactions from '@/views/components/modal/FilterTransactions.vue';
import eventBus from '@/eventBus';
import {useI18n} from 'vue-i18n';

const {t} = useI18n();

const loading = ref(true);
const drawer = ref(false);

const user = computed( () => store.state.user );

watch(user, () => {
  if (!user.value) {
    loading.value = false;
    return;
  }

  store.dispatch('fetchCurrencyRates');

  store.dispatch('database/fetchData')
      .then(() => {
        loading.value = false;
      })
      .catch(e => store.commit('addError', e.message))
      .finally(() => loading.value = false)

  store.watch((state) => state.database.date, () => {
    store.dispatch('database/fetchTransactions')
  }, {deep: true})
})

const showFilterDialog = ref(false);
eventBus.on('filterBtnClicked', () => {
  showFilterDialog.value = true;
})
</script>
