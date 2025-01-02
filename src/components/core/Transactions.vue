<template>
  <v-container>
    <!-- Filters -->
    <v-row class="mb-4">
      <v-col cols="12" md="4">
        <v-text-field
            v-model="filterText"
            label="Search"
            append-icon="mdi-magnify"
            clearable
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="4">
        <v-select
            v-model="selectedCategory"
            :items="categories"
            item-title="name"
            item-value="id"
            label="Category"
            clearable
        ></v-select>
      </v-col>
      <v-col cols="12" md="4">
        <v-select
            v-model="selectedAccount"
            :items="accounts"
            item-title="name"
            item-value="id"
            label="Account"
            clearable
        ></v-select>
      </v-col>
    </v-row>

    <!-- Transaction List -->
    <v-list>
      <v-list-item-group v-if="filteredTransactions.length">
        <v-list-item
            v-for="transaction in filteredTransactions"
            :key="transaction.id"
            @click="viewTransaction(transaction)"
        >
          <v-list-item-content>
            <v-list-item-title>
              {{ transaction.amount }} - {{ transaction.categoryName }}
            </v-list-item-title>
            <v-list-item-subtitle>
              {{ transaction.date }} | {{ transaction.name }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>

      <v-list-item v-if="!filteredTransactions.length">
        <v-list-item-content>No transactions found.</v-list-item-content>
      </v-list-item>
    </v-list>

    <CreateTransaction />
  </v-container>
</template>

<script setup>
import {ref, computed, onMounted} from 'vue';
import {useStore} from 'vuex';
import CreateTransaction from '@/components/core/modal/CreateTransaction.vue';

const store = useStore()
const filterText = ref('');
const selectedCategory = ref(null);
const selectedAccount = ref(null);


const categories = computed(() => store.state.database.categories);
const accounts = computed(() => store.state.database.accounts);


const transactions = computed(() => store.state.database.transactions)

// Filter transactions based on text search and selected filters
const filteredTransactions = computed(() => {
  return transactions.value.filter((transaction) => {
    const matchesText =
        transaction.note
            .toLowerCase()
            .includes(filterText.value.toLowerCase());

    return matchesText;
  });
});

onMounted( () => {
  store.dispatch('database/fetchTransactions');
  store.dispatch('database/fetchAccounts');
  store.dispatch('database/fetchCategories');
})

const viewTransaction = (transaction) => {
  console.log('Viewing transaction:', transaction);
};
</script>
