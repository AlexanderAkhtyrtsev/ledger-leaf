<template>
      <v-chip
          v-for="category in categories"
          class="ma-2"
          label
          draggable
      >
        <v-icon start>{{ category.icon }}</v-icon>
        {{ category.name }}
      </v-chip>
</template>

<script setup>
import store from '@/store';
import {computed} from 'vue';

const categories = computed(() => store.state.database.categories)
</script>