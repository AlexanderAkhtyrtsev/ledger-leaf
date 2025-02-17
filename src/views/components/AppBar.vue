<script setup>
import eventBus from '@/eventBus';
import {useRoute} from 'vue-router';
import {computed} from 'vue';
import store from '@/store';

const route = useRoute();

const actionIcons = computed( () => [
  {
    name: 'filter',
    icon: 'mdi-filter',
    show: () => ['transactions', 'reports'].includes(route.name),
    badge: () => store.getters['database/filtersApplied'],
  },
  {
    name: 'plus',
    icon: 'mdi-plus',
    show: () => ['home', 'transactions', 'categories'].includes(route.name),
  },
].filter( icon => icon.show ? icon.show() : true) );


</script>

<template>
  <v-app-bar app>
    <v-app-bar-nav-icon @click="$emit('toggle-drawer')"></v-app-bar-nav-icon>
    <v-toolbar-title>Ledger Leaf 🌿</v-toolbar-title>
    <v-btn
        v-for="icon in actionIcons"
        icon
        @click="eventBus.emit(icon.name + 'BtnClicked')">
      <v-icon>{{icon.icon}}</v-icon>

      <v-badge
          v-if="icon.badge && icon.badge()"
          :content="icon.badge()"
          color="info"
      ></v-badge>
    </v-btn>
  </v-app-bar>
</template>

<style scoped>

</style>