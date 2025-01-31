<template>
  <v-card>
    <v-card-title>Categories</v-card-title>
    <v-card-text>
      <v-list>
        <Category v-for="cat in categories" :category="cat" />
      </v-list>
    </v-card-text>
    <CreateCategory />
  </v-card>
</template>

<script setup>
import {computed} from 'vue';
import store from '@/store';
import CreateCategory from '@/views/components/modal/CreateCategory.vue';
import Category from '@/views/settings/unit/Category.vue';

const categories = computed(() => store.getters['database/categories'] );

</script>

<style scoped>

</style>