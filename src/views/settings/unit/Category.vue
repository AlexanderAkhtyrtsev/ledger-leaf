<template>
  <v-list-item
      :data-category-id="cat.id"
      @dragstart="emit('drag-start', $event)"
      @drop="emit('drag-drop', $event)"
      draggable="true"
  >
    <template v-slot:prepend><v-icon :class="{['ms-' + (2 * (level || 0))]: true}">{{cat.icon}}</v-icon></template>
    <template v-slot:title>{{ cat.name }}</template>
  </v-list-item>
  <v-list v-if="cat.children.length">
    <Category
        @drag-start="emit('drag-start', $event)"
        @drag-drop="emit('drag-drop', $event)"
        v-for="child in cat.children"
        :category="child" :level="(level || 1) + 1"
    />
  </v-list>
</template>

<script setup>
const emit = defineEmits(['drag-start', 'drag-drop']);

const {category: cat, level} = defineProps(['category', 'level'])

</script>

<style scoped>

</style>