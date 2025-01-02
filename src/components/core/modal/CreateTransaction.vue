<template>
  <v-dialog v-model="dialog" max-width="600px">
    <v-card>
      <v-card-title>Create Transaction</v-card-title>
      <v-card-text>
        <v-form ref="form" @submit.prevent="createTransaction">
          <v-text-field
              v-model="transaction.amount"
              label="Amount"
              type="number"
              required
          ></v-text-field>

          <v-select
              v-model="transaction.category"
              :items="categories"
              item-title="name"
              item-value="id"
              label="Category"
              required
          ></v-select>

          <v-select
              v-model="transaction.account"
              :items="accounts"
              item-title="name"
              item-value="id"
              label="Account"
              required
          ></v-select>

          <v-menu
              v-model="menu"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              min-width="290px"
          >
            <template #activator="{ props }">
              <v-text-field
                  v-model="transaction.date"
                  label="Date"
                  readonly
                  v-bind="props"
              ></v-text-field>
            </template>
            <v-date-picker
                v-model="transaction.date"
                @input="menu = false"
            ></v-date-picker>
          </v-menu>

          <v-textarea
              v-model="transaction.note"
              label="Note"
              rows="2"
          ></v-textarea>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn text @click="dialog = false">Cancel</v-btn>
        <v-btn text color="primary" @click="createTransaction">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import {onBeforeUnmount, onMounted, ref} from 'vue';
import {useStore} from 'vuex';
import {computed} from 'vue';
import eventBus from '@/eventBus';

const store = useStore()
const dialog = ref(false);
const menu = ref(false);

const transaction = ref({
  amount: null,
  category: null,
  account: null,
  date: new Date(),
  note: '',
});

const categories = computed(() => store.state.database.categories);
const accounts = computed(() => store.state.database.accounts);

const createTransaction = () => {
  store.dispatch('database/createTransaction', {
    amount: transaction.value.amount,
    categoryId: transaction.value.category,
    accountId: transaction.value.account,
    date: transaction.value.date,
    note: transaction.value.note,
  });
  dialog.value = false;
};

onMounted(() => {
  eventBus.on('plusBtnClicked', () => {
    dialog.value = true;
  });
})

onBeforeUnmount(() => {
  eventBus.off('plusBtnClicked');
});
</script>
