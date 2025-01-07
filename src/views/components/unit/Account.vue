<template>
  <v-card
      class="mx-auto"
      target="_blank"
      :title="account.name"
      :subtitle="formatCurrency(account.amount, account.currency) + ( account.note ? ' - ' + account.note : '' )"
  >
   <template v-slot:prepend>
     <v-icon size="x-large">{{ account.icon || 'mdi-wallet' }}</v-icon>
   </template>
    <template v-slot:append>
      <v-btn flat>
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </template>
  </v-card>
</template>

<script setup>
import {formatCurrency} from '@/helpers'

const {account} = defineProps(['account']);
</script>