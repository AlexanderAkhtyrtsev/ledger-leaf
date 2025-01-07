<template>
  <v-text-field
      v-model="value"
      prepend-inner-icon="mdi-magnify"
      label="Search..."
  />
</template>

<script setup>
const value = defineModel();
</script>
