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
            <v-list-subheader>Accounts</v-list-subheader>
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

const applyFilters = () => {
  dialog.value = false
}
</script>

<style scoped>

</style>