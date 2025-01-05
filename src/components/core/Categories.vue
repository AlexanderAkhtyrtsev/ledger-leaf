<template>
  <v-container>
      <v-row v-if="categories.length">
        <v-col
            v-for="category in categories"
            :key="category.id"
            cols="12"
            md="4"
            lg="3"
        >
          <v-card>
            <v-card-title>
              <v-icon large class="mr-2">{{ category.icon }}</v-icon>
              {{ category.name }}
            </v-card-title>
            <v-card-subtitle>
              Type: {{ category.type }}
            </v-card-subtitle>
          </v-card>
        </v-col>
      </v-row>

    <CreateCategory />
  </v-container>
</template>

<script>
import CreateCategory from '@/components/core/modal/CreateCategory.vue';

export default {
  components: {
    CreateCategory
  },
  computed: {
    categories() {
      return this.$store.state.database.categories;
    }
  },
  mounted() {
    this.$store.dispatch('database/fetchCategories')
  }
};
</script>
