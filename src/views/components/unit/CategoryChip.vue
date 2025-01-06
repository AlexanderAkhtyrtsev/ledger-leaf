<template>
  <div :style="{ display: category.parentId ? 'inline' : 'block' }"
  >
    <v-chip
        class="ma-2"
        label
        draggable
        :data-category-id="category.id"
        @click="showChildren = !showChildren"
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

    <CategoryChip v-if="category.children.length"
                  v-show="showChildren"
                  v-for="child in category.children"
                  :category="child"
    />
  </div>
</template>

<script setup>
import {ref} from 'vue';

const {category} = defineProps(['category'])
const showChildren = ref(false);
</script>