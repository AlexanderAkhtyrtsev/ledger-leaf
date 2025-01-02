<template>
  <v-app>
    <!-- Navbar -->
    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Ledger Leaf 🌿</v-toolbar-title>
    </v-app-bar>

    <Sidebar v-model="drawer" />

      <!-- Content -->
    <v-main>
      <v-container>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>

import Sidebar from '@/components/Sidebar.vue';
import {ref} from 'vue';

const drawer = ref(false);
</script>
