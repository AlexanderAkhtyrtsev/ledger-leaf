<template>
    <CategoryChip
        v-for="category in categories"

        :category="category"
        @dragstart="handleDragStart"
        @drop="handleDrop"
        @dragover.prevent
    />
</template>

<script setup>
import store from '@/store';
import {computed, ref} from 'vue';
import CategoryChip from '@/views/components/unit/CategoryChip.vue';

const categories = computed(() => store.getters['database/categories'] );

const srcElement = ref(null);

const handleDragStart = (event) => {
  srcElement.value = event.target;
}

const handleDrop = (event) => {
  const target = event.target.closest('[data-category-id]');
  if ( !target || !srcElement.value ) return;

  const {categoryId: parentId} = target.dataset;
  const id = srcElement.value.dataset.categoryId;

  srcElement.value = null;

  if ( !id || !parentId || id === parentId) return;

  store.dispatch('database/updateCategory', {
    id,
    parentId
  } )
}

</script>