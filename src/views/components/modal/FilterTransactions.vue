<template>
    <v-dialog v-model="dialog" :max-width="$vuetify.display.mdAndUp ? '500px' : null" :fullscreen="!$vuetify.display.mdAndUp">
      <v-card>
        <v-card-title>Filter Transactions</v-card-title>
        <v-card-text>
          <v-list
              v-model:selected="store.state.database.filters.accounts"
              lines="two"
              select-strategy="leaf"
          >
            <div class="text-subtitle-2 my-1">Accounts</div>
            <v-list-item
                v-for="item in accounts"
                :key="item.id"
                :subtitle="item.currency"
                :title="item.name"
                :value="item.id"
            >
              <template v-slot:prepend="{ isSelected }">
                <v-list-item-action start>
                  <v-checkbox-btn :model-value="isSelected"></v-checkbox-btn>
                </v-list-item-action>
              </template>
            </v-list-item>
          </v-list>

          <div class="text-subtitle-2 my-1">Type</div>
          <v-radio-group
              v-model="store.state.database.filters.type"
              inline
          >
            <v-radio
                label="All"
                value=""
            ></v-radio>
            <v-radio
                label="Income"
                value="income"
            ></v-radio>
            <v-radio
                label="Expense"
                value="expense"
            ></v-radio>
          </v-radio-group>

          <div class="text-subtitle-2 my-1">Categories</div>
          <v-autocomplete
              v-model="store.state.database.filters.categories"
              :items="categories"
              color="blue-grey-lighten-2"
              label="Select"
              item-title="name"
              item-value="id"
              chips
              closable-chips
              multiple
          >
            <template v-slot:chip="{ props, item }">
              <v-chip
                  v-bind="props"
                  :text="item.raw.name"
              >
               <template v-slot:prepend>
                 <v-icon>{{ item.raw.icon }}</v-icon>
               </template>
              </v-chip>
            </template>

            <template v-slot:item="{ props, item }">
              <v-list-item
                  v-bind="props"
                  :title="item.raw.name"
              >
                <template v-slot:prepend>
                  <v-icon>{{ item.raw.icon }}</v-icon>
                </template>
              </v-list-item>
            </template>
          </v-autocomplete>
        </v-card-text>

        <v-card-actions>
          <v-btn @click="applyFilters">Apply</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script setup>
import {ref, watch} from 'vue';
import store from '@/store';

const emit = defineEmits(['close']);

const dialog = ref(true);

watch(dialog, (v) => {
  if (!v)
    emit('close');
})

const accounts = store.getters['database/accounts'];
const categories = store.state.database.categories;

const applyFilters = () => {
  dialog.value = false
}
</script>

<style scoped>

</style>