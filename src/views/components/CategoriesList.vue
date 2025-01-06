<template>
    <CategoryChip
        v-for="category in categories"
        :category="category"
        @dragstart="handleDragStart"
        @drop="handleDrop"
        @dragover.prevent
    ></CategoryChip>
</template>

<script setup>
import store from '@/store';
import {computed, ref} from 'vue';
import CategoryChip from '@/views/components/unit/CategoryChip.vue';

const categories = computed(() => store.getters['database/categories'] );

const srcElement = ref(null);

let clone;

const handleDragStart = (event) => {
  srcElement.value = event.target;
  clone = event.target.cloneNode(true);
  clone.style.position = 'absolute';
  clone.style.top = '-9999px'; // Hide it off-screen
  document.body.appendChild(clone);

  console.log(event.target)
  event.dataTransfer.setDragImage(event.target.querySelector('.v-chip__underlay'), 0, 0);
}

const handleDrop = (event) => {
  clone && document.body.removeChild(clone);
  const target = event.target.closest('[data-category-id]');
  if ( !target || !srcElement.value ) return;

  const {categoryId: parentId} = target.dataset;
  const id = srcElement.value.dataset.categoryId;

  srcElement.value = null;

  if ( !id || id === parentId) return;

  store.dispatch('database/updateCategory', {
    id,
    parentId
  } )
}

</script>