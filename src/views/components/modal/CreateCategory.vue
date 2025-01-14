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

          <icon-picker v-model="icon" :hint="categoryName" />

          <v-select
              v-model="type"
              class="my-2"
              :items="categoryTypes"
              label="Category Type"
              :rules="[requiredRule]"
              required
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
import IconPicker from '@/views/components/unit/IconPicker.vue';

export default {
  components: {IconPicker},
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
    };
  },
  computed: {
    categories() {
      return this.$store.state.database.categories;
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
