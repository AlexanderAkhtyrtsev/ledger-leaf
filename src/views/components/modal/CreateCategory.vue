<template>
  <!-- Modal Dialog -->
  <v-dialog v-model="dialog" max-width="500px">
    <v-card>
      <v-card-title class="headline">{{ category.id ? 'Edit Category: ' + category.name : 'Create Category'}}</v-card-title>

      <v-card-text>
        <v-form v-model="formValid" @submit.prevent="submit">
          <v-text-field
              v-model="category.name"
              label="Category Name"
              :rules="[requiredRule]"
              required
          />

          <icon-picker v-model="category.icon" :value="category.icon" :hint="category.name" />

          <v-select
              v-model="category.type"
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
        <v-btn :disabled="!formValid" @click="submit" color="primary">{{ category.id ? 'Update' : 'Create'}}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import {ref, onMounted, onBeforeUnmount} from 'vue';
import store from '@/store';
import eventBus from '@/eventBus';
import IconPicker from '@/views/components/unit/IconPicker.vue';

const dialog = ref(false);

const formValid = ref(false);
const categoryTypes = ['must', 'need', 'want'];

const category = ref({
  name: '',
  icon: '',
  type: 'need',
  parentId: null,
})

const requiredRule = value => !!value || 'This field is required';

const submit = async () => {
  try {
    await store.dispatch(category.value.id ? 'database/updateCategory' : 'database/createCategory', {
      ...category.value,
    });

    resetForm();
    dialog.value = false;
  } catch (error) {
    console.error('Error creating category:', error);
  }
};

const resetForm = () => {
  category.value = {
    name: '',
    icon: '',
    type: 'need',
    parentId: null,
  }
};

const pullData = (data = {}) => {
  console.log(data)
  dialog.value = true;

  for(const p in data) {
    category.value[p] = data[p];
  }
}

onMounted(() => {
  eventBus.on('add-category',  pullData);
  eventBus.on('edit-category', pullData);
});

onBeforeUnmount(() => {
  eventBus.off('add-category',  pullData);
  eventBus.off('edit-category', pullData);
})
</script>

