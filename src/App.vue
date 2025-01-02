<template>
  <v-app>
    <AppBar @toggle-drawer="drawer = !drawer" />
    <Sidebar v-model="drawer" />

    <v-main>
      <v-container>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import Sidebar from '@/components/Sidebar.vue';
import AppBar from '@/components/AppBar.vue';
import {ref} from 'vue';

const drawer = ref(false);

</script>
