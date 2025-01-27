<template>
  <v-card
      density="compact"
      class="mx-auto bg-blue-grey-darken-4"
      target="_blank"
      :title="account.name"
  >
    <template v-slot:subtitle>
      <Currency :amount="+account.remaining" :currency="account.currency" />
      {{ ( account.note ? ' - ' + account.note : '' ) }}
    </template>
   <template v-slot:prepend>
     <v-icon size="x-large">{{ account.icon || 'mdi-wallet' }}</v-icon>
   </template>
  </v-card>
</template>

<script setup>
import Currency from '@/views/components/unit/Currency.vue';
const {account} = defineProps(['account']);

</script>