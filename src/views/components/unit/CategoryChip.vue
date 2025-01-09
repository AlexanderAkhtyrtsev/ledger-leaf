<template>
  <v-col cols="4" md="1" class=" d-flex align-content-stretch">
  <v-sheet
      class="ma-0 pa-2 rounded-lg flex-1-0-0 d-flex flex-column flex-wrap justify-space-around"
      label
      draggable="true"
      :data-category-id="category.id"
      @dragstart="emit('drag-start', $event)"
      @drop="emit('drag-drop', $event)"
      @dragover.prevent
      :color="matchesFilter ? 'grey-darken-3' : ''"
  >
    <div class="text-center pa-2">
      <v-badge
          v-if="category.children.length"
          color="secondary"
          :content="category.children.length"
      >
        <v-icon :size="30">{{ category.icon }}</v-icon>
      </v-badge>
      <v-icon v-else size="30">{{ category.icon }}</v-icon>
    </div>
    <div class="text-center" :style="{'min-height': '2em', 'font-size': $vuetify.display.mdAndUp ? '1rem' : '0.8rem'}">
      {{ category.name }}
    </div>
  </v-sheet>
  </v-col>

  <template v-if="category.children.length"
            v-for="child in category.children">
    <CategoryChip
        :category="child"
        :filter="filter"
        :idx="idx"
        @drag-start="emit('drag-start', $event)"
        @drag-drop="emit('drag-drop', $event)">
    </CategoryChip>
  </template>
</template>

<script setup>
import {computed} from 'vue';

const {category, filter, idx} = defineProps(['category', 'filter', 'idx'])
const emit = defineEmits(['drag-start', 'drag-drop'])

const matchesFilter = computed(() => {
  return filter && category.name.toLowerCase().includes(filter.toLowerCase())
})

</script>