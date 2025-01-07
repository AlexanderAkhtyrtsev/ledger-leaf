<template>
  <span v-show="!category.parentId || matchesFilter">
    <v-col @click="toggle" class="ma-0 pa-1">
    <v-chip
        class="ma-0"
        :size="category.children.length && !category.parentId ? ($vuetify.display.mdAndUp ? 'x-large' : 'default') : ($vuetify.display.mdAndUp ? 'default' : 'small')"
        :color="category.children.length && !category.parentId ? 'primary' : category.parentId ? 'success' : 'secondary'"
        label
        draggable
        :data-category-id="category.id"
        @dragstart="emit('drag-start', $event)"
        @drop="emit('drag-drop', $event)"
        @dragover.prevent
    >
      <v-icon start>{{ category.icon }}</v-icon>
      {{ category.name }}

      <v-badge
          v-if="category.children.length"
          color="secondary"
          inline
          :content="category.children.length"
      > </v-badge>
    </v-chip>

    </v-col>

    <CategoryChip v-if="category.children.length"
                  v-for="child in category.children"
                  :category="child"
                  v-show="showChildren"
                  :filter="filter"
                  @drag-start="emit('drag-start', $event)"
                  @drag-drop="emit('drag-drop', $event)">
    </CategoryChip>
  </span>
</template>

<script setup>
import {ref, computed} from 'vue';

const {category, filter} = defineProps(['category', 'filter'])
const emit = defineEmits(['drag-start', 'drag-drop'])


const matchesFilter = computed(() => {
  return filter && category.name.toLowerCase().includes(filter.toLowerCase())
})

const showChildren = ref(false)

const toggle = () => {
  showChildren.value = !showChildren.value
}
</script>