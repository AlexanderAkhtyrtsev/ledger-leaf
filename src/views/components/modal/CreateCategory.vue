<template>
  <!-- Modal Dialog -->
  <v-dialog v-model="dialog" max-width="500px">
    <v-card>
      <v-card-title class="headline">Create Category</v-card-title>

      <v-card-text>
        <v-form v-model="formValid" @submit.prevent="createCategory">
          <v-text-field
              v-model="categoryName"
              label="Category Name"
              :rules="[requiredRule]"
              required
          />

          <v-chip-group
              class="mb-5"
              column
              active-class="bg-primary text-white"
          >
            <v-chip
                v-for="i in icons"
                :key="i"
                @click="icon = i"
                outlined
            ><v-icon class="mr-2">{{ i }}</v-icon>
            </v-chip>
          </v-chip-group>

          <v-select
              v-model="type"
              :items="categoryTypes"
              label="Category Type"
              :rules="[requiredRule]"
              required
          />

          <!-- Parent Category Selection -->
          <v-select
              v-model="parentCategory"
              :items="categories"
              item-value="id"
              item-title="name"
              label="Select Parent Category (optional)"
              :rules="[optionalRule]"
          />
        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-btn @click="dialog = false" color="secondary">Cancel</v-btn>
        <v-btn :disabled="!formValid" @click="createCategory" color="primary">Create</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import eventBus from '@/eventBus';
import {categoryIcons, findIconByKeyword} from '@/helpers/categories-icons';

export default {
  data() {
    return {
      dialog: false, // Controls the modal visibility
      categoryName: '',
      icon: '',
      type: '',
      parentCategory: null, // ID of the parent category
      formValid: false,
      categoryTypes: ['must', 'need', 'want'], // Category types
      requiredRule: value => !!value || 'This field is required',
      optionalRule: value => true, // Optional field (parent category)
    };
  },
  computed: {
    categories() {
      return this.$store.state.database.categories;
    },
    icons() {
      if (this.categoryName) {
        return Object.entries(categoryIcons)
            .sort(([, keywords], [, keywords2]) => {
              return keywords.toLowerCase().includes(this.categoryName.toLowerCase())
                     && !keywords2.toLowerCase().includes(this.categoryName.toLowerCase())
                     ? -1
                     : 1
            })
            .map(([icon]) => icon)
      }
      return Object.keys(categoryIcons)
    },
  },
  methods: {
    async createCategory() {
      try {
        this.$store.dispatch('database/createCategory', {
          name: this.categoryName,
          icon: this.icon,
          type: this.type,
          userId: this.$store.state.user.uid, // Link the category to the current user
          parentId: this.parentCategory || null, // Link to parent category if selected
          createdAt: new Date(),
        })
            .then( () => {
              this.resetForm();
              this.dialog = false;
            })
        ;
      } catch (error) {
        console.error('Error creating category:', error);
      }
    },

    resetForm() {
      this.categoryName = '';
      this.icon = '';
      this.type = '';
      this.parentCategory = null;
    },
  },
  mounted() {
    eventBus.on('plusBtnClicked', () => {
      this.dialog = true;
    });
  }
};
</script>
