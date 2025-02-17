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
            <template v-slot:append-inner>{{displayCurrency}}</template>
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

          <v-row>
            <v-col cols="8">
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
            </v-col>
            <v-col cols="4">
              <v-menu
                  v-model="timePickerMenu"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
              >
                <template #activator="{ props }">
                  <v-text-field
                      v-model="formattedTime"
                      label="Date"
                      readonly
                      v-bind="props"
                  ></v-text-field>
                </template>
                <v-time-picker
                    v-model="time"
                    format="24hr"
                    @input="timePickerMenu = false"
                ></v-time-picker>
              </v-menu>
            </v-col>
          </v-row>
        </v-form>

        <v-card-actions v-if="transaction.id">
          <DeleteButton label="Delete Transaction" @delete="deleteTransaction" />
        </v-card-actions>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup>
import {onBeforeUnmount, onMounted, ref, watch} from 'vue';
import {useStore} from 'vuex';
import {computed} from 'vue';
import eventBus from '@/eventBus';
import {DateTime} from 'luxon';
import DeleteButton from '@/views/components/unit/DeleteButton.vue';
import {useRoute} from 'vue-router';

const store = useStore()
const route = useRoute();
const dialog = ref(false);

const menu = ref(false);
const timePickerMenu = ref(false);

const defaultData = () => ({
  amount: null,
  categoryId: null,
  accountId: null,
  date: new Date(),
  note: '',
  type: 'expense' // or income
});

const transaction = ref(defaultData());

const formattedDate = computed(() => {
  return DateTime
      .fromJSDate(
          transaction.value.date.toDate
          ? transaction.value.date.toDate()
          : transaction.value.date
      )
      .toFormat('dd LLLL yyyy')
})


const formattedTime = computed(() => {
  return DateTime
      .fromJSDate(
          transaction.value.date.toDate
          ? transaction.value.date.toDate()
          : transaction.value.date
      )
      .toFormat('HH:mm')
})

const time = ref(formattedTime.value);

watch(time, (val) => {
  const dt = DateTime.fromJSDate(transaction.value.date);

  transaction.value.date = DateTime.fromSQL( dt.toFormat('yyyy-LL-dd') + ' ' + val ).toJSDate()
})

const isFormValid = computed(() => {
  return ![+transaction.value.amount, transaction.value.categoryId, transaction.value.accountId]
      .some( prop => !prop )
});

const categories = computed(() => store.state.database.categories);
const accounts = computed(() => store.state.database.accounts);

const displayCurrency = computed(() => {
  return transaction.value.accountId
         ? store.getters['database/getAccountById'] (transaction.value.accountId).currency
         : store.getters['database/favouriteCurrency']
});

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

const deleteTransaction = () => {
  store.dispatch('database/deleteTransaction', transaction.value.id)
      .then( (success) => success && (dialog.value = false) )
}

onMounted(() => {
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

    transaction.value['amount'] = transaction.value['amount']
                                  ? Math.abs(transaction.value['amount'])
                                  : transaction.value['amount'];

    time.value = formattedTime.value;
  };


  route.name !== 'home' && eventBus.on('plusBtnClicked', () => {
    transaction.value = defaultData();
    dialog.value = true;
  } );

  eventBus.on('create-transaction', pullData);
  eventBus.on('update-transaction', pullData);
})

onBeforeUnmount(() => {
  route.name !== 'home' && eventBus.off('plusBtnClicked');
  eventBus.off('create-transaction');
  eventBus.off('update-transaction');
});
</script>
