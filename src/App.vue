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
        {{ error || 'Unknown Error' }}
      </v-snackbar>

      <v-progress-linear v-if="loading" indeterminate color="primary" />
      <v-container v-else>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import Sidebar from '@/views/components/Sidebar.vue';
import AppBar from '@/views/components/AppBar.vue';
import {computed, ref, watch} from 'vue';
import store from '@/store';

const loading = ref(true);
const drawer = ref(false);

const user = computed( () => store.state.user );

watch(user, () => {
  store.dispatch('database/fetchData').then( () => {
    loading.value = false;
  }).catch( e => {
    console.error(e);
    loading.value = false;
  })
})


</script>
