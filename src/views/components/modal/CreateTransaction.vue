<template>
  <v-dialog v-model="dialog" :max-width="$vuetify.display.mdAndUp ? '600px' : null" :fullscreen="!$vuetify.display.mdAndUp">
    <v-card>
      <v-card-title class="d-flex justify-space-between align-center">
        <span v-text="transaction.id ? 'Edit Transaction' : 'Create Transaction'"></span>
        <v-card-actions>
          <v-btn text @click="dialog = false">Cancel</v-btn>
          <v-btn text color="primary" :disabled="!isFormValid" @click="submit">Save</v-btn>
        </v-card-actions>
      </v-card-title>

      <v-card-text>
        <v-form ref="form" @submit.prevent="submit">
          <v-text-field
              v-model="transaction.amount"
              label="Amount"
              type="number"
              autofocus
              required
          >
            <template v-slot:append>
              <v-btn-toggle v-model="transaction.type">
                <v-btn value="expense" size="x-small" outlined class="rounded-lg">
                  Expense
                </v-btn>
                <v-btn value="income"  size="x-small" outlined class="rounded-lg">
                  Income
                </v-btn>
              </v-btn-toggle>
            </template>
          </v-text-field>


          <v-textarea
              v-model="transaction.note"
              label="Note"
              rows="2"
          ></v-textarea>

          <v-select
              v-model="transaction.categoryId"
              :items="categories"
              item-title="name"
              item-value="id"
              label="Category"
              required
          ></v-select>

          <v-select
              v-model="transaction.accountId"
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
                  v-model="formattedDate"
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
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup>
import {onBeforeUnmount, onMounted, ref} from 'vue';
import {useStore} from 'vuex';
import {computed} from 'vue';
import eventBus from '@/eventBus';
import {DateTime} from 'luxon';

const store = useStore()
const dialog = ref(false);
const menu = ref(false);

const transaction = ref({
  amount: null,
  categoryId: null,
  accountId: null,
  date: new Date(),
  note: '',
  type: 'expense' // or income
});


const formattedDate = computed(() => {
  return DateTime
      .fromJSDate(
          transaction.value.date.toDate
          ? transaction.value.date.toDate()
          : transaction.value.date
      )
      .toFormat('dd LLL yyyy HH:mm')
})

const isFormValid = computed(() => {
  return ![transaction.value.amount, transaction.value.categoryId, transaction.value.accountId].includes(null)
});

const categories = computed(() => store.state.database.categories);
const accounts = computed(() => store.state.database.accounts);

const submit = () => {
  const preparedData = { ...transaction.value }

  preparedData['amount'] = preparedData.type === 'income'
                           ? Math.abs(preparedData['amount'])
                           :  -1 * Math.abs(preparedData['amount'])

  store.dispatch(
      preparedData.id
      ? 'database/updateTransaction'
      : 'database/createTransaction',
      preparedData,
  );

  dialog.value = false;
};

onMounted(() => {
  eventBus.on('plusBtnClicked', () => {
    dialog.value = true;
  });

  const pullData = ( transactionData ) => {
    dialog.value = true;

    for(const p in transactionData) {
      transaction.value[p] = transactionData[p];
    }

    transaction.value['type'] = transactionData['amount'] > 0 ? 'income' : 'expense'

    // Convert to JS date
    transaction.value['date'] = transaction.value['date']?.['toDate']
                                ? transaction.value['date']['toDate']()
                                : transaction.value['date'];

    transaction.value['amount'] = Math.abs(transaction.value['amount']);
  };

  eventBus.on('create-transaction', pullData);
  eventBus.on('update-transaction', pullData);
})

onBeforeUnmount(() => {
  eventBus.off('plusBtnClicked');
  eventBus.off('create-transaction');
  eventBus.off('update-transaction');
});
</script>
