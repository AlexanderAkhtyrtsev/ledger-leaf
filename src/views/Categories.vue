<template>
  <v-container>
    <CategoriesList />

    <CreateCategory />
  </v-container>
</template>

<script setup>
import CreateCategory from '@/views/components/modal/CreateCategory.vue';
import CategoriesList from '@/views/components/CategoriesList.vue';
</script>
