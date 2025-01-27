<template>
  <div>
    <v-progress-linear v-if="loading" indeterminate color="primary" />
    <v-card class="mb-4">
      <v-card-title>Import Transactions</v-card-title>
      <v-card-text>
        <v-file-input
            label="Upload CSV"
            accept=".csv"
            @change="handleFileUpload"
        ></v-file-input>

        <v-alert v-if="errorMessage" type="error" class="mt-2">
          {{ errorMessage }}
        </v-alert>

        <v-btn
            :disabled="!transactions.length"
            class="mt-3"
            color="primary"
            @click="importData"
        >
          Import Transactions
        </v-btn>
      </v-card-text>
    </v-card>

    <v-card v-if="transactions.length">
      <v-card-title>Preview</v-card-title>
      <v-card-text>
        <v-data-table
            :headers="tableHeaders"
            :items="transactions"
            class="elevation-1"
        ></v-data-table>
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import {uploadToFirestore} from '@/firebase/import';
import Papa from 'papaparse';

const transactions = ref([]);
const errorMessage = ref('');

const tableHeaders = [
  { text: 'Account', value: 'account' },
  { text: 'Category', value: 'category' },
  { text: 'Currency', value: 'currency' },
  { text: 'Amount', value: 'amount' },
  { text: 'Date', value: 'date' },
  { text: 'Note', value: 'note' },
];

const handleFileUpload = (event) => {
  const file = event.target.files[0];
  if (!file) return;
  try {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        if (results.errors.length) {
          errorMessage.value = 'Error parsing CSV file.';
          return;
        }
        transactions.value = results.data.map((row) => ({
          account: row.account,
          category: row.category || null,
          currency: row.currency,
          amount: parseFloat(row.amount),
          date: new Date(row.date),
          note: row.note || '',
        }));
      },
    });
  } catch(e) {
    console.error('Error parsing CSV file:', e);
    errorMessage.value = 'Error parsing CSV file.' + e.toString();
  }
};

const loading = ref(false)

const importData = () => {
  loading.value = true;
  uploadToFirestore(transactions.value)
      .finally( () => loading.value = false)
}
</script>

<style scoped>

</style>