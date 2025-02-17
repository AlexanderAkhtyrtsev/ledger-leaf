<template>
  <v-list lines="two" class="px-0" v-if="transactionList.length" density="compact">
    <v-list-item
        class="px-0"
        v-for="transaction in transactionList"
        :key="transaction.id"
    >
      <template v-slot:title>{{ displayDescription(transaction, true) }}</template>
      <template v-slot:subtitle>{{ displayDescription(transaction)}}</template>

      <v-list-item-subtitle class="text-high-emphasis">
        <Date v-model="transaction.date" />
      </v-list-item-subtitle>

      <template v-slot:prepend>
        <v-avatar class="px-0">
          <v-icon>{{ transaction.category?.icon }}</v-icon>
        </v-avatar>
      </template>

      <template v-slot:append>
        <div :style="{ color: transaction.amount > 0 ? 'green' : 'red' }">
          {{ transaction.amount > 0 ? '+' : '' }}
          <Currency :amount="transaction.amount" :currency="transaction.currency" style="font-size: 90%;" />
        </div>
      </template>
    </v-list-item>
  </v-list>
</template>
<script setup>
import Date from "@/views/components/unit/Date.vue";
import Currency from "@/views/components/unit/Currency.vue";

const transactionList = defineModel();

const displayDescription = (transaction, isTitle) => {
  const category = (transaction.category ? transaction.category.name : `Transfer ${transaction.amount < 0 ? '<-' : '->'} ` + transaction.account.name);
  if ( isTitle ) {
    return transaction.note || category
  }

  return transaction.note ? category : ''
}
</script>