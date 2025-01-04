<template>
  <v-container class="about-page" style="max-width: 600px; margin: auto; text-align: center;">
    <v-card class="pa-6">
      <v-card-title class="headline">Ledger Leaf 🌿 v{{version}}</v-card-title>
      <v-card-text>
        Developed by <a href="https://github.com/AlexanderAkhtyrtsev">Alex Akhtyrtsev</a> with ❤️
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
// No additional logic needed
</script>

<style scoped>
.about-page {
  margin-top: 20px;
}
</style>
