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

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import eventBus from '@/eventBus';
import IconPicker from '@/views/components/unit/IconPicker.vue';

const store = useStore();

const dialog = ref(false);
const categoryName = ref('');
const icon = ref('');
const type = ref('');
const parentCategory = ref(null);
const formValid = ref(false);
const categoryTypes = ['must', 'need', 'want'];

const requiredRule = value => !!value || 'This field is required';

const categories = computed(() => store.state.database.categories);

const createCategory = async () => {
  try {
    await store.dispatch('database/createCategory', {
      name: categoryName.value,
      icon: icon.value,
      type: type.value,
      userId: store.state.user.uid,
      parentId: parentCategory.value || null,
      createdAt: new Date(),
    });
    resetForm();
    dialog.value = false;
  } catch (error) {
    console.error('Error creating category:', error);
  }
};

const resetForm = () => {
  categoryName.value = '';
  icon.value = '';
  type.value = '';
  parentCategory.value = null;
};

onMounted(() => {
  eventBus.on('add-category', () => {
    dialog.value = true;
  });
});
</script>

