<script setup>
import eventBus from '@/eventBus';
import {useRoute} from 'vue-router';
import {computed} from 'vue';

const route = useRoute();

const actionIcons = computed( () => [
  {
    name: 'plus',
    icon: 'mdi-plus',
    show: () => ['accounts', 'transactions', 'categories'].includes(route.name),
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
    </v-btn>
  </v-app-bar>
</template>

<style scoped>

</style>