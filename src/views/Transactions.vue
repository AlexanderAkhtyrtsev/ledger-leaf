<template>
  <SwitchPeriod />
  <GroupedTransactionsList />
  <CreateTransaction />
</template>

<script setup>
import CreateTransaction from '@/views/components/modal/CreateTransaction.vue';
import SwitchPeriod from '@/views/components/unit/SwitchPeriod.vue';
import GroupedTransactionsList from '@/views/components/GroupedTransactionsList.vue';
</script>
