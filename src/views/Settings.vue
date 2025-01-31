<template>
  <v-container class="pa-0">
    <v-row class="ga-4">
      <v-col>
        <UserSettings />
      </v-col>
      <v-col>
        <ImportFromCsv />
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <Categories />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import ImportFromCsv from '@/views/settings/ImportFromCsv.vue';
import UserSettings from '@/views/settings/UserSettings.vue';
import Categories from '@/views/settings/Categories.vue';
</script>
