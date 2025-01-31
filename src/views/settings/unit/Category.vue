<template>
  <v-list-item>
    <template v-slot:prepend><v-icon :class="{['ms-' + (2 * (level || 0))]: true}">{{cat.icon}}</v-icon></template>
    <template v-slot:title>{{ cat.name }}</template>
  </v-list-item>
  <v-list v-if="cat.children.length">
    <Category v-for="child in cat.children" :category="child" :level="(level || 1) + 1" />
  </v-list>
</template>

<script setup>
const {category: cat, level} = defineProps(['category', 'level'])
</script>

<style scoped>

</style>