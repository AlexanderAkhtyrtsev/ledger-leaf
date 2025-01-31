<template>
  <!-- Modal Dialog -->
  <v-dialog v-model="dialog" max-width="500px">
    <v-card>
      <v-card-title class="d-flex align-center">
        <span>{{ category.id ? 'Edit Category: ' + category.name : 'Create Category'}}</span>
        <v-spacer></v-spacer>

        <v-menu>
          <template v-slot:activator="{ props }">
            <v-btn icon="mdi-dots-vertical" variant="text" v-bind="props"></v-btn>
          </template>

          <v-list v-if="category.id">
            <v-list-item @click="toggleArchive">
              <v-list-item-title>{{ !category.archived ? 'Archive' : 'Unarchive' }}</v-list-item-title>
            </v-list-item>
            <v-list-item v-if="category.parentId" @click="makeTopLevel">
              <v-list-item-title>Make Top-level</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-card-title>


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

const makeTopLevel = () => {
  store.dispatch('database/updateCategory',{
    ...category.value,
    parentId: null,
  })
      .then( () => { category.value.parentId = null })
      .catch( e => store.commit('addError', e.message || 'Unknown error'));
}

const toggleArchive = () => {
  store.dispatch('database/updateCategory',{
    ...category.value,
    archived: +!category.value.archived,
  })
      .then( () => category.value.archived = +!category.value.archived)
      .catch( e => store.commit('addError', e.message || 'Unknown error'));
}

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

