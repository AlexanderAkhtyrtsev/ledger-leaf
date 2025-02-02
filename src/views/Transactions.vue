<template>
  <SwitchPeriod />
  <TransactionsList />
  <CreateTransaction />
</template>

<script setup>
import CreateTransaction from '@/views/components/modal/CreateTransaction.vue';
import TransactionsList from '@/views/components/TransactionsList.vue';
import SwitchPeriod from '@/views/components/unit/SwitchPeriod.vue';
</script>
