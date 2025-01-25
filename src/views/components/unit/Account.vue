<template>
  <v-card
      density="compact"
      class="mx-auto bg-blue-grey-darken-4"
      target="_blank"
      :title="account.name"
      :subtitle="formatCurrency(account.remaining, account.currency) + ( account.note ? ' - ' + account.note : '' )"
  >
   <template v-slot:prepend>
     <v-icon size="x-large">{{ account.icon || 'mdi-wallet' }}</v-icon>
   </template>
  </v-card>
</template>

<script setup>
import {formatCurrency} from '@/helpers'

const {account} = defineProps(['account']);
</script>