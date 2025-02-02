<template>
  <v-col cols="4" md="2" lg="2" xl="1"
         :class="{ 'd-flex align-content-stretch pa-2': true }">
  <v-sheet
      @click="category.children.length ? emit('expand', !expand) : ''"
      class="ma-0 pa-2 rounded-lg flex-1-0-0 d-flex flex-column flex-wrap justify-space-around"
      label
      draggable="true"
      :data-category-id="category.id"
      @dragstart="emit('drag-start', $event)"
      @drop="emit('drag-drop', $event)"
      @dragover.prevent
      :color="color"
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
    <div class="text-center" :style="{'min-height': '2em', 'font-size': $vuetify.display.mdAndUp ? '0.9rem' : '0.8rem'}">
      {{ category.name }}
    </div>
  </v-sheet>
  </v-col>

  <template v-if="category.children.length && expand"
            v-for="child in category.children">
    <Category
        :category="child"
        :filter="filter"
        @drag-start="emit('drag-start', $event)"
        @drag-drop="emit('drag-drop', $event)"
        :expand="expand"
        :level="(level || 0) + 1"
    ></Category>
  </template>
</template>

<script setup>
import {computed} from 'vue';

const {category, filter, expand, level } = defineProps(['category', 'filter', 'expand', 'level'])

const emit = defineEmits(['drag-start', 'drag-drop', 'expand'])

const color = computed(() => {
  if ( matchesFilter.value ) {
    return 'green-darken-4';
  }

  if ( level === 1 ) {
    return 'grey-darken-3'
  }
  if ( level === 2 ) {
    return 'grey-darken-2'
  }
  if ( level >= 3 ) {
    return 'grey-darken-1'
  }

});

const matchesFilter = computed(() => {
  return filter && category.name.toLowerCase().includes(filter.toLowerCase())
})

</script>