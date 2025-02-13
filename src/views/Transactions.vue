<template>
  <SwitchPeriod />
  <GroupedTransactionsList />
  <CreateTransaction />
  <FilterTransactions v-if="showFilterDialog" @close="showFilterDialog = false" />
</template>

<script setup>
import CreateTransaction from '@/views/components/modal/CreateTransaction.vue';
import SwitchPeriod from '@/views/components/unit/SwitchPeriod.vue';
import GroupedTransactionsList from '@/views/components/GroupedTransactionsList.vue';
import FilterTransactions from '@/views/components/modal/FilterTransactions.vue';
import eventBus from '@/eventBus';
import {ref} from 'vue';

const showFilterDialog = ref(false);
eventBus.on('filterBtnClicked', () => {
  showFilterDialog.value = true;
})
</script>
