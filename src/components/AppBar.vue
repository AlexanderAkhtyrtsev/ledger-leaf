<script setup>
import eventBus from '@/eventBus';
import {useRoute} from 'vue-router';

const route = useRoute();

const actionIcons = [
  {
    name: 'plus',
    icon: 'mdi-plus',
    show: () => ['accounts'].includes(route.name),
  }
];

</script>

<template>
  <v-app-bar app>
    <v-app-bar-nav-icon @click="$emit('toggle-drawer')"></v-app-bar-nav-icon>
    <v-toolbar-title>Ledger Leaf 🌿</v-toolbar-title>

    <v-btn
        v-for="icon in actionIcons"
        :v-if="icon.show()"
        icon
        @click="eventBus.emit(icon.name + 'BtnClicked')">
      <v-icon>mdi-{{icon.name}}</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<style scoped>

</style>