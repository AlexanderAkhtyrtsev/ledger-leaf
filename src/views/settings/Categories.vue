<template>
  <v-card>
    <template v-slot:title>Categories</template>
    <template v-slot:append>
      <v-btn @click="eventBus.emit('add-category')"><v-icon>mdi-plus</v-icon></v-btn>
    </template>
    <v-card-text>
      <v-list @dragover.prevent>
        <Category
            v-for="cat in categories"
            :category="cat"
            @drag-start="handleDragStart"
            @drag-drop="handleDrop"
        />
      </v-list>
    </v-card-text>
    <CreateCategory />
  </v-card>
</template>

<script setup>
import {computed, ref} from 'vue';
import store from '@/store';
import CreateCategory from '@/views/components/modal/CreateCategory.vue';
import Category from '@/views/settings/unit/Category.vue';
import eventBus from '@/eventBus';

const categories = computed(() => store.getters['database/categories'] );

const srcElement = ref();

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
    ...srcCategory,
    parentId
  } )
}
</script>

<style scoped>

</style>