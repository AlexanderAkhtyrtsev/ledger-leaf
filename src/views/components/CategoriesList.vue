<template>
  <div>
    <Search v-model="filter" />

    <v-row @drop="handleDrop" @dragover.prevent class="pb-10" >
      <CategoryChip
          v-for="(category, idx) in sortedCategories"
          :category="category"
          @drag-start="handleDragStart"
          @drag-drop="handleDrop"
          :filter="filter"
          :expand="expanded === category.id ? category.id : null"
          @expand="() => {expanded = expanded === category.id ? null : category.id}"
      ></CategoryChip>
    </v-row>
  </div>
</template>

<script setup>
import store from '@/store';
import {computed, ref} from 'vue';
import CategoryChip from '@/views/components/unit/CategoryChip.vue';
import Search from '@/views/components/unit/Search.vue';

const categories = computed(() => store.getters['database/categories'] );

const srcElement = ref(null);

const expanded = ref(null);

const handleDragStart = (event) => {
  event.dataTransfer.setData(
      'text/plain', JSON.stringify({
        type: 'category',
        data: store.getters['database/getCategoryById'](event.target.dataset.categoryId),
      }),
  )
  srcElement.value = event.target;
}

const handleDrop = (event) => {
  const target = event.target.closest('[data-category-id]');

  if ( !srcElement.value ) return;

  const parentId = target?.dataset?.categoryId || null;
  const id = srcElement.value.dataset.categoryId;

  srcElement.value = null;

  if ( !id || id === parentId) return;

  const srcCategory = store.getters['database/getCategoryById'](id);
  const parentCategory = store.getters['database/getCategoryById'](parentId);

  if ( parentCategory?.parentId === srcCategory.id ) return;

  store.dispatch('database/updateCategory', {
    id,
    parentId
  } )
}


const filter = ref('');

const sortedCategories = computed(() => {
  const v = filter.value.toLowerCase();

  const doesCategoryOrChildrenMatch = (category, filterValue) => {
    // Check if the category name matches or if any child matches recursively
    if (category.name.toLowerCase().includes(filterValue)) return true;
    return (category.children || []).some(child => doesCategoryOrChildrenMatch(child, filterValue));
  };

  const compare = (a, b) => {
    const aMatches = doesCategoryOrChildrenMatch(a, v);
    const bMatches = doesCategoryOrChildrenMatch(b, v);

    // Prioritize parents with matching children or themselves
    if (aMatches && !bMatches) return -1;
    if (!aMatches && bMatches) return 1;
    if ( a.children.length && !b.children.length) return -1;
    if ( !a.children.length && b.children.length) return 1;

    // Sort alphabetically if both or neither match
    return a.name.localeCompare(b.name);
  };

  const sortRecursively = (categories) => {
    return categories
        .map((category) => ({
          ...category,
          children: sortRecursively(category.children || []),
        }))
        .sort(compare);
  };

  return sortRecursively(categories.value);
});
</script>