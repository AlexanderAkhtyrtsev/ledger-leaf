<template>
  <v-container>
    <AccountsList />
  </v-container>

  <CreateAccount />
</template>


<script setup>
import CreateAccount from '@/views/components/modal/CreateAccount.vue';
import AccountsList from '@/views/components/AccountsList.vue';
</script>
